const express = require('express')
const path = require('path')
const puppeteer = require('puppeteer');
const insttallPuppeteer = require('../lib/installPuppeteer.js');
const findFreePort = require("../lib/findFreePort.js");

module.exports = async function() {
  this.app = null;
  this.server = null;
  this.loop = null;
  this.browser = null;
  this.isBusy = false;
  this.processingStartTime = 0;

  await insttallPuppeteer(this.logger);

  // find free port
  this.port = await findFreePort();

  // host frontend
  this.app = express();
  this.app.use(express.static(path.join(__dirname, '..', 'www')))
  this.server = this.app.listen(this.port, 'localhost', () => this.logger.info(`UbdPlayer started at http://localhost:${this.port}`))

  // start browser
  this.browser = await puppeteer.launch();
  this.logger.info(`Starting player at ${this.settings.ubdPlayer.speed}x speed`);
  this.loop = setInterval(async () => {
    if(!this.settings.ubdPlayer.enabled) {
      this.broker.destroyService(this);
      return;
    }
    if(this.isBusy) {
      let processDuration = new Date().getTime() - this.processingStartTime;
      if(processDuration > 1.5 * this.settings.ubdPlayer.timeout) {
        this.logger.warn('Battle not responding. `Restarting...');
        try {
          await this.browser.close();
        } catch(err) {
          this.logger.warn('cannot close browser when restarting');
          this.logger.warn(err);
        }
        try {
          this.browser = await puppeteer.launch();
          this.isBusy = false;
        } catch(err) {
          this.logger.warn('cannot restart');
          this.logger.warn(err);
        }
      }
      return;
    }
    let page;
    let task
    try {
      task = await this.broker.call('queue.read', {topic: 'ubdPlayer'});
      if(!task || !task.ok) {
        return;
      } else {
        task = task.payload;
      }
    } catch (err) {
      this.logger.warn('Cannot connect to queue: ' + err);
      return;
    }
    try {
      this.processingStartTime = new Date().getTime();
      this.isBusy = true;
      this.logger.info('Starting a battle...')
      let ubd = task.ubd;
      page = await this.browser.newPage();
      page.on('console', (message) => this.logger.debug(`${message.type().substr(0, 3).toUpperCase()} ${message.text()}`));
      page.on('pageerror', ({ message }) => this.logger.debug(message));
      await page.goto('http://localhost:' + this.port);
      await page.waitForSelector('#ubd');
      await page.$eval('#ubd', (el, ubdData) => {
        el.value = JSON.stringify(ubdData)
      }, ubd);
      await page.$eval('#speed', (el, speed) => {
        el.value = speed
      }, this.settings.ubdPlayer.speed);

      this.logger.debug('Battle started');
      await page.click('#start');
      await page.waitForSelector('#output', {timeout: this.settings.ubdPlayer.timeout});
      this.logger.debug('Battle completed');
      const element = await page.$("#output");
      const text = await page.evaluate((el) => el.innerHTML, element);
      if(page && !page.isClosed()) {
        await page.close();
      }
      const jsonResult = JSON.parse(text);
      jsonResult.ubd = ubd;
      if(task.refData) {
        jsonResult.refData = task.refData;
      }
      let eventName = "ubdPlayer.battle";
      if(task.event) {
        eventName = eventName + ("." + task.event)
      } else {
        eventName = eventName + ".default"
      }
      let dt = new Date().getTime() - this.processingStartTime;
      this.logger.info(`Battle finished after ${dt}ms`)
      this.broker.broadcast(eventName, jsonResult);
      this.isBusy = false;
    } catch (err) {
      this.logger.warn('Unable to finish the battle');
      this.logger.warn(err);
      this.logger.debug('UBD that failed: ' + (task && task.ubd ? JSON.stringify(task.ubd) : 'undefined'));
      this.isBusy = false;
      if(page && !page.isClosed()) {
        await page.close();
      }
    }
  }, this.settings.ubdPlayer.queueQueryTime)

}
