'use strict';

const express = require('express');
const puppeteer = require('puppeteer');

module.exports = class UbdArenaService {

  constructor(options) {
    this._options = options;
    this._options.webroot = this._options.webroot || './';
    this._options.debug = this._options.debug || true;
    this._options.webport = this._options.webport || 3000;
    this._options.webhost = this._options.webhost || 'localhost';
    this._ready = false;
    this._webapp = null;
    this._webserver = null;
    this._log("UBD Arean Service started");
  }

  init() {
    return new Promise((resolve) => {
      this._log(`Launching web server from ${this._options.webroot}`);
      this._webapp = express();
      this._webapp.use(express.static(this._options.webroot));
      this._webserver = this._webapp.listen(
        this._options.webport,
        this._options.webhost,
        () => {
          console.log(`Web server started at ${this._options.webhost}:${this._options.webport}`);
          this._ready = true;
          return resolve();
        }
      );
    });
  }

  close() {
    this._log("Closing UBD Arena Service...");
    if(this._webserver) {
      this._webserver.close();
      this._webserver = null;
    }
  }

  process(ubdContent) {
    return new Promise(async (resolve, reject) => {
      if(!this._ready) {
        return reject(new Error("Service is not ready yet. Try again later."));
      }
      this._log("Processing UBD content...");
      try {
        this._log("Starting browser...");
        let browser = await puppeteer.launch();
        let page = await browser.newPage();
        let url = `http://${this._options.webhost}:${this._options.webport}#ubdPlayer`;
        this._log(`Loading ${url}`);
        await page.goto(url);
        this._log(`Passing ${ubdContent.length} bytes of UBD data`);
        await page.$eval(
          '#ubdInput',
          (el, ubdContent) => {
            el.value = ubdContent;
          },
          ubdContent
        );
        this._log(`Starting the battle...`);
        let startTime = (new Date()).getTime();
        await page.click("#playButton");
        await Promise.race([
          page.waitForSelector("#loading"),
          page.waitForSelector("#error"),
        ]);
        this._log(`Battle started. It may take a while`);
        await Promise.race([
          page.waitForSelector("#result", {timeout: 60000}),
          page.waitForSelector("#error", {timeout: 60000})
        ]);

        let error = await page.$('#error');
        let html;
        let dt = (new Date()).getTime() - startTime;

        if(error) {
          html = await page.$eval('#error', (element) => element.innerHTML);
          this._log(`Error after ${dt}ms: ${html}`);
          this._log(`Closing web browser`);
          await browser.close();
          return reject({error: html});
        } else {
          this._log(`Battle completed after ${dt}ms`);
          html = await page.$eval('#result', (element) => element.innerHTML);
          this._log(`Closing web browser`);
          await browser.close();

          return resolve(JSON.parse(html));
        }


      } catch (err) {
        return reject({error: String(err)});
      }
    });
  }

  _log(msg) {
    if(this._options.debug) {
      console.log(msg);
    }
  }

};
