const expect = require('chai').expect
const {After, Given, When, Then, AfterAll, Before } = require('cucumber');
const puppeteer = require('puppeteer');
const urlLib = require('url');
const path = require('path');
const MockServer = require('jsbattle-mockserver');

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
      'width': 1200,
      'height': 800,
      'deviceScaleFactor': 1,
      'isMobile': false,
      'hasTouch': false,
      'isLandscape': true
    }
  });
  client.log = [];
  client.page.on('console', msg => client.log.push(msg));
  return client;
}

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

    const db = require(path.resolve(__dirname, '..', 'db_snapshot', snapshotName));
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
    dump += this.client.log.map((msg) => {
      if(msg.text && msg.type) {
        return `[${msg.type()}] ${msg.text()}`;
      } else {
        return String(msg)
      }
    }).join("\n");
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
Given('admin open in the browser', async function () {
  this.client = await createWebClient();
  const port = this.parameters.port || 8071;
  const baseUrl = `http://localhost:${port}/admin`;

  await this.client.page.goto(baseUrl);

  const css = '.mock-auth-button';
  await this.client.page.waitForSelector(css);
  await this.client.page.click(css);

  await this.client.page.goto(baseUrl);
});

// WHEN ------------------------------------------------------------------------
When('open {string} section', async function (linkName) {
  await this.client.page.waitForSelector('.side-menu');

  var links = await this.client.page.evaluate(() => {
    var links = document.querySelectorAll('.side-menu .nav a.nav-link');
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
  var css = '.side-menu .nav a.nav-link:nth-of-type(' + (index+1) + ')';
  await this.client.page.waitForSelector(css);
  await this.client.page.click(css);
});

When('the data table is displayed', async function () {
    await this.client.page.waitForSelector('table.smart-table');
});

// THEN ------------------------------------------------------------------------
Then('data table contains {int} rows', async function (rowCount) {
  var rows = await this.client.page.evaluate(() => {
    var rows = document.querySelectorAll('.smart-table tbody tr');
    return rows.length
  });
  expect(rows).to.be.equal(10);
});

Then('{string} section is selected', async function (linkName) {
  await this.client.page.waitForSelector('.side-menu');

  var name = await this.client.page.evaluate(() => {
    var link = document.querySelector('.side-menu .nav a.nav-link.active');
    return link.text;
  });

  expect(name).to.match(new RegExp(linkName, 'i'));
});
