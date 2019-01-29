import 'babel-polyfill';
import assert from "assert";
import config from './lib/config.js';
import mlog from './lib/mlog.js';
import puppeteer from 'puppeteer';

describe('Web Page', function() {
  this.slow(10000);
  this.timeout(30000);
  this.browser = null;
  this.page = null;
  this.mlog = mlog;
  //this.mlog.disabled = false;
  this.config = config;

  this.consoleLog = [];

  this.createNewPage = async () => {
    if(this.page) {
      await this.page.close();
    }
    this.page = await this.browser.newPage();
    this.consoleLog = [];
    this.page.on('console', msg => {
      for (let i = 0; i < msg.args().length; ++i) {
        this.consoleLog.push(`${i}: ${msg.args()[i]}`);
      }
    });
    await this.page.emulate({
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
  }

  before(async () => {
    this.mlog.log('Starting Chrome...');
    this.browser = await puppeteer.launch({args: ['--no-sandbox']});
    await this.createNewPage();
    this.mlog.log('Chrome page loaded');
  });

  after(async () => {
    this.mlog.log("Closing Chrome");
    await this.browser.close();
    this.mlog.log("Tests completed. Bye bye");
  });
  let self = this;

  afterEach(async function () {

    if(this.currentTest.state == 'failed') {
      let filename = this.currentTest.title.replace(/[\\\?\%\*]/g, '_');
      await self.page.screenshot({
        path: __dirname + `/../../tmp/${filename}.png`
      });
      console.log("Browser console output:\n\n" + self.consoleLog.join("\n"));
    }

  });

  describe('Docs', async () => {

    this.visitedLinks = [];
    this.unvisitedLinks = [];

    it('should have all links working', async () => {
      let self = this;
      async function visit(url) {
        self.visitedLinks.push(url);
        // open url
        await self.page.goto(url);
        let title = await self.page.title();
        let html = await self.page.content();
        let size = (html.length/1000);

        // fetch links
        let links = await self.page.evaluate(() => {
          let aLinks = document.querySelectorAll('a');
          aLinks = Object.values(aLinks).map(el => el.href);
          return aLinks;
        });
        links = links.filter((el, index, list) => {
          return (new RegExp(self.config.BASE_URL)).test(el)
            && list.indexOf(el) === index
            && self.visitedLinks.indexOf(el) === -1
            && self.unvisitedLinks.indexOf(el) === -1;
        })

        console.log(`size: ${size.toFixed(2)}KB, \tnew links: ${links.length}, \tURL: ${url}`);
        while(links.length) {
          self.unvisitedLinks.push(links.pop());
        }

        assert(size > 1, `Page ${url} is not empty. Current size: ${size.toFixed(2)}KB`);

        if(self.unvisitedLinks.length > 0) {
          await visit(self.unvisitedLinks.pop());
        }
      }

      await visit(this.config.BASE_URL, this.page, this.visitedLinks, this.unvisitedLinks);
      console.log(`Links visited: ${this.visitedLinks.length}`);
      assert(this.visitedLinks.length > 10, `Amount of links in docs is more than ten (${this.visitedLinks.length})`)

    });

  });

});
