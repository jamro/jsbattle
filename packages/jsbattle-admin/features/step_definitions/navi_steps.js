const expect = require('chai').expect
const {After, Given, When, Then, AfterAll, BeforeAll } = require('cucumber');
const puppeteer = require('puppeteer');
const urlLib = require('url');
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

BeforeAll(async function () {
  let worldParameters = {};
  for(let i=0; i < this.process.argv.length; i++) {
    if(this.process.argv[i] == '--world-parameters' && i+1 < this.process.argv.length) {
      worldParameters = JSON.parse(this.process.argv[i+1])
    }
  }
  if(worldParameters.mockserver) {
    this.mockserver = new MockServer();
    await this.mockserver.start({
      port: 8071,
      public: './dist',
      authorized: true,
      silent: true,
      rootUrl: '/admin'
    });
  }
});

AfterAll(function () {
  if(this.mockserver) {
    this.mockserver.stop();
    this.mockserver = null;
  }
});

After(async function (scenario) {
  if(this.client) {
    let dump = "\n-- CONSOLE LOG DUMP ---------------------\n";
    dump += this.client.log.map(msg => `[${msg.type()}] ${msg.text()}`).join("\n");
    dump += "\n-----------------------------------------";
    this.attach(dump)
  }
  if(this.client && this.client.browser) {
    await this.client.browser.close();
    this.client.browser = null;
    this.client.page = null;
  }
});

// GIVEN -----------------------------------------------------------------------
Given('admin open in the browser', async function () {
  this.client = await createWebClient();
  const port = this.parameters.port || 8071;
  const baseUrl = `http://localhost:${port}/admin`;
  await this.client.page.goto(baseUrl);
});

// WHEN ------------------------------------------------------------------------
When('open {string} section', async function (linkName) {
  await this.client.page.waitFor('.side-menu');

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
  await this.client.page.waitFor(css);
  await this.client.page.click(css);
});

When('the data table is displayed', async function () {
    await this.client.page.waitFor('table.smart-table');
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
  await this.client.page.waitFor('.side-menu');

  var name = await this.client.page.evaluate(() => {
    var link = document.querySelector('.side-menu .nav a.nav-link.active');
    return link.text;
  });

  expect(name).to.match(new RegExp(linkName, 'i'));
});
