const assert = require('assert');
const {After, Given, When, Then } = require('cucumber');
const puppeteer = require('puppeteer');
const jsonServer = require('json-server');

var baseUrl = 'http://localhost:8070/';

After(async function () {
  if(this.client && this.client.browser) {
    await this.client.browser.close();
    this.client.browser = null;
    this.client.page = null;
  }
});

// GIVEN -----------------------------------------------------------------------

Given('there is JsBattle open in the browser', async function () {
  this.client = {};
  this.client.browser = await puppeteer.launch({args: ['--no-sandbox']});
  if(this.client.page) {
    await this.client.page.close();
  }
  this.client.page = await this.client.browser.newPage();
  await this.client.page.emulate({
    'name': 'Desktop',
    'userAgent': 'Chrome',
    'viewport': {
      'width': 1200,
      'height': 800,
      'deviceScaleFactor': 1,
      'isMobile': false,
      'hasTouch': false,
      'isLandscape': true
    }
  });
  await this.client.page.goto(baseUrl);
});

// WHEN ------------------------------------------------------------------------

When('navigate to {string} section', async function (linkName) {
  await this.client.page.waitFor('a.main-nav-link.active');

  var links = await this.client.page.evaluate(() => {
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
  await this.client.page.waitFor(css);
  await this.client.page.click(css);
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

  assert.equal(activeLink, page);
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

  for(var i=0; i < 10; i++) {
    await delay(100);
    var docsOpen = await check(tabTitle);
    if(docsOpen) {
      return assert(true, 'has "' + tabTitle + '" tab open');
    }
    assert(false, 'has "' + tabTitle + '" tab open');
  }

});
