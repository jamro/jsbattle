const expect = require('chai').expect
const {After, Before, Given, When, Then, AfterAll, BeforeAll } = require('cucumber');
const puppeteer = require('puppeteer');
const urlLib = require('url');
const path = require('path');
const { setDefinitionFunctionWrapper } = require('cucumber');
const MockServer = require('jsbattle-mockserver');

setDefinitionFunctionWrapper(function(fn, options) {
  if(Object.getPrototypeOf(fn).constructor.name == 'AsyncFunction') {
    return async function(...args) {
      if(this.client && this.client.page && (!options || !options.noLoadingWait)) {
        await this.client.page.waitFor(() => !document.querySelector('.loading'));
      }
      return await fn.apply(this, args);
    }
  }
  return function(...args) {
    return fn.apply(this, args);
  }
})

async function createPage(browser) {
  var page = await browser.newPage();
  return page;
}

async function createWebClient() {
  let client = {};
  client.browser = await puppeteer.launch({args: ['--no-sandbox']});
  if(client.page) {
    await client.page.close();
  }
  client.page = await createPage(client.browser);
  await client.page.setUserAgent("puppeteer-test");
  client.page.setCacheEnabled(false);
  await client.page.emulate({
    'name': 'Desktop',
    'userAgent': 'puppeteer-test',
    'viewport': {
      'width': 1000,
      'height': 800,
      'deviceScaleFactor': 1,
      'isMobile': false,
      'hasTouch': false,
      'isLandscape': true
    }
  });
  client.log = [];
  client.page.on('console', async (msg) => {
    client.log.push(msg)
  });
  return client;
}

var naviHelper = {
  gotoSection: async (page, linkName) => {
    await page.waitFor('a.main-nav-link.active');

    var links = await page.evaluate(() => {
      var links = document.querySelectorAll('a.main-nav-link');
      var names = [];
      for(var i=0; i < links.length; i++) {
        names[i] = links[i].innerHTML
      }
      return names;
    });

    var index;
    for(index=0; index < links.length; index++) {
      var pattern = new RegExp(linkName);
      if(linkName, pattern.test(links[index])) {
        break;
      }
    }
    var css = 'nav .nav-item:nth-of-type(' + (index+1) + ') a.main-nav-link';
    await page.waitFor(css);
    await page.click(css);
  }
};

Before(async function (scenario) {
  let worldParameters = this.parameters;
  if(worldParameters.mockserver) {
    const snapshotTags = scenario.pickle.tags
      .map((tag) => tag.name.replace(/^@/, ''))
      .filter((tag) => /^snapshot_/.test(tag))
    let snapshotName = '';
    if(snapshotTags.length > 0) {
      snapshotName = snapshotTags.shift() + '.json';
    } else {
      snapshotName = 'snapshot_default.json';
    }
    const dbPath = path.resolve(__dirname, '..', 'db_snapshot', snapshotName);
    delete require.cache[dbPath];
    const db = require(dbPath);
    const defaultOptions = {
      port: 8070,
      public: './dist',
      authorized: false,
      silent: true
    };
    this.mockserver = new MockServer();
    await this.mockserver.start(db._config || defaultOptions, db);
  }
});

After(async function (scenario) {
  if(this.client) {
    let dump = "\n-- CONSOLE LOG DUMP ---------------------\n";
    for(let i=0; i < this.client.log.length; i++) {
      let msg = this.client.log[i]
      let args = await msg.args();
      dump += `[${msg.type()}] ${msg.text()}\n`;
      for(let j=0; j< args.length; j++) {
        if(args[j]._remoteObject && args[j]._remoteObject.description) {
          dump += args[j]._remoteObject.description + "\n"
        }
      }

    }
    dump += "\n-----------------------------------------";
    this.attach(dump)
    if(this.client.page && !this.client.page.isClosed()) {
      this.attach((await this.client.page.screenshot({type: 'jpeg', quality: 10})).toString('base64'));
    }
  }
  if(this.client && this.client.browser) {
    await this.client.browser.close();
    this.client.browser = null;
    this.client.page = null;
  }
  if(this.mockserver) {
    this.mockserver.stop();
    this.mockserver = null;
  }
});

// GIVEN -----------------------------------------------------------------------

Given('JsBattle open in the browser', async function () {
  this.client = await createWebClient();

  const port = this.parameters.port || 8070;
  const baseUrl = `http://localhost:${port}/`;

  await this.client.page.goto(baseUrl);
  await this.client.page.exposeFunction('gtag_alt', (event, action, data) => {
    let serial = "";
    serial += data.event_category !== undefined ? data.event_category : "";
    serial += "/" + action;

    if(data.event_label !== undefined) {
      serial += "/" + data.event_label;
    }
    if(data.value !== undefined) {
      serial += "/" + data.value;
    }
    this.gaEvents.push(serial);
  });
  await this.client.page.evaluate(() => {
    window.gtag = window.gtag_alt;
  });
});

Given('JsBattle replay for battle {string} open in the browser', async function (battleId) {
  this.client = await createWebClient();
  const port = this.parameters.port || 8070;
  const baseUrl = `http://localhost:${port}/`;
  await this.client.page.goto(baseUrl + "/#replay=" + battleId);
});

Given('{string} section open', async function (section) {
  await naviHelper.gotoSection(this.client.page, section);
});

// WHEN ------------------------------------------------------------------------

When('navigate to {string} section', async function (section) {
  await naviHelper.gotoSection(this.client.page, section);
});

When('screenshot', async function () {
  if(this.client.page && !this.client.page.isClosed()) {
    let buffer = await this.client.page.screenshot({type: 'jpeg', quality: 10});
    console.log(await buffer.toString('base64'));
  }
});

When('visited all pages at {string}', {timeout: 60 * 1000}, async function (uri) {
  var visitedLinks = [];
  var unvisitedLinks = [];
  var self = this;
  var response = null;
  this.client.history = [];
  async function visit(url, base) {
    visitedLinks.push(url);
    // open url
    response = await self.client.page.goto(url) || response; // anchor links does not return response so use previous one
    let title = await self.client.page.title();
    let html = await self.client.page.content();
    let size = html.length;

    // fetch links
    let links = await self.client.page.evaluate(() => {
      let aLinks = document.querySelectorAll('a');
      aLinks = Object.values(aLinks).map(el => el.href);
      return aLinks;
    });
    links = links.filter((el, index, list) => {
      return (new RegExp(base)).test(el)
        && list.indexOf(el) === index
        && visitedLinks.indexOf(el) === -1
        && unvisitedLinks.indexOf(el) === -1;
    });

    let images = await self.client.page.evaluate(() => {
      let images = document.querySelectorAll('img');
      images = Object.values(images).map(el => {
        return {
          url: el.src,
          width: el.clientWidth,
          height: el.clientHeight
        }
      });
      return images;
    });

    self.client.history.push({
      url: url,
      content: html,
      size: html.length,
      title: title,
      ok: response.ok(),
      status: response.status(),
      images: images
    });

    while(links.length) {
      unvisitedLinks.push(links.pop());
    }

    if(unvisitedLinks.length > 0) {
      await visit(unvisitedLinks.pop(), base);
    }
  }

  const port = this.parameters.port || 8070;
  const baseUrl = `http://localhost:${port}/`;

  var base = urlLib.resolve(baseUrl, uri);
  await visit(base, base);

});

When('open URI {string}', async function (uri) {
  const port = this.parameters.port || 8070;
  const baseUrl = `http://localhost:${port}/`;
  this.client.lastResponse = await this.client.page.goto(baseUrl + "/" + uri);
});

// THEN ------------------------------------------------------------------------
Then('{string} section is selected in the navigation bar', async function (page) {
  let result = await this.client.page.evaluate(() => {
    const button = document.querySelector('a.main-nav-link.active');
    return button.innerHTML;
  });
  let activeLink = result
    .replace(/<.*>/g, '')
    .replace(/^\s*/, "")
    .replace(/\s*$/, "");

  expect(activeLink, "activeLink").to.be.equal(page);
});

Then('new tab named {string} is open', async function (tabTitle) {
  const delay = (duration) => {
    return new Promise(resolve => setTimeout(resolve, duration));
  };

  const check = async (pageTitle) => {
    var pages = await this.client.browser.pages();
    for(var i = 0; i < pages.length; i++) {
      if(await pages[i].title() == pageTitle) {
        return true;
      }
    }
    return false;
  }

  await delay(100);
  var docsOpen = await check(tabTitle);
  expect(!!docsOpen, 'Tab open with title ' + tabTitle).to.be.ok;
});

Then('visited more than {int} pages', function (threshold) {
 expect(this.client.history, 'visited pages').to.be.an('array');
 expect(this.client.history, 'visited pages').to.not.be.empty;
 expect(this.client.history.length, 'visited pages count').to.be.greaterThan(threshold);
});

Then('all visited pages loaded successfully', function () {
  expect(this.client.history, 'visited pages').to.be.an('array');
  expect(this.client.history, 'visited pages').to.not.be.empty;
  this.client.history.forEach((item) => {
    expect(item.ok, 'HTTP status of ' + item.url).to.be.ok;
  });
});

Then('all visited images loaded successfully', async function () {
  expect(this.client.history, 'visited pages').to.be.an('array');
  expect(this.client.history, 'visited pages').to.not.be.empty;

  let images = [];
  this.client.history.forEach((item) => {
    images = images.concat(item.images.map(i => i.url));
  });

  const port = this.parameters.port || 8070;
  const baseUrl = `http://localhost:${port}/`;

  images = images.filter((value, index, self) => {
    return self.indexOf(value) === index && (new RegExp(baseUrl)).test(value);
  });

  let testPage = await createPage(this.client.browser);
  await testPage.setUserAgent("puppeteer-test");
  testPage.setCacheEnabled(false);

  for(var i=0; i < images.length; i++) {
    let response = await testPage.goto(images[i]);
    let isOk = response.ok();
    if(!isOk) {
      console.error("\nHTTP status: " + response.status() + ", url: " + images[i]);
    }
    expect(isOk, 'HTTP Status of ' + images[i]).to.be.ok;
  }

});

Then('server response is ok', function () {
  expect(this.client.lastResponse.ok()).to.be.ok;
});

Then('server response is valid JSON', async function () {
  let text = await this.client.lastResponse.text();
  let error = null;
  try{
    JSON.parse(text);
  } catch(err) {
    error = err;
  }
  expect(error, "response: " + text).to.be.equal(null);
});
