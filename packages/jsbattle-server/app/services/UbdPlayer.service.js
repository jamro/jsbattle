const Service = require("moleculer").Service;
const { ValidationError, MoleculerError } = require("moleculer").Errors;
const express = require('express')
const path = require('path')
const puppeteer = require('puppeteer');
const insttallPuppeteer = require('./ubdPlayer/installPuppeteer.js');

class UbdPlayer extends Service {

  constructor(broker) {
    super(broker);
    this.app = null;
    this.server = null;
    this.loop = null;
    this.browser = null;
    this.isBusy = false;
    this.processingStartTime = 0;
    this.parseServiceSchema({
      name: "ubdPlayer",
      dependencies: ['ubdValidator'],
      actions: {
        scheduleBattle: this.scheduleBattle,
        getQueueLength: this.getQueueLength,
      },
      started: async () => {
        await insttallPuppeteer(this.logger);

        // host frontend
        this.app = express();
        const port = broker.serviceConfig.ubdPlayer.port
        this.app.use(express.static(path.join(__dirname, 'ubdPlayer', 'www')))
        this.server = this.app.listen(port, 'localhost', () => this.logger.info(`UbdPlayer started at http://localhost:${port}`))

        // start browser
        this.browser = await puppeteer.launch();

        this.loop = setInterval(async () => {
          if(this.isBusy) {
            let processDuration = new Date().getTime() - this.processingStartTime;
            if(processDuration > 1.5 * broker.serviceConfig.ubdPlayer.timeout) {
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
          if(this.queue.length === 0) {
            return;
          }
          try {
            this.processingStartTime = new Date().getTime();
            this.isBusy = true;

            let task = this.queue.shift();
            let ubd = task.ubd;
            let page = await this.browser.newPage();
            await page.goto('http://localhost:' + port);
            await page.waitFor('#ubd');
            await page.$eval('#ubd', (el, ubd) => {
              el.value = JSON.stringify(ubd)
            }, ubd);
            await page.$eval('#speed', (el, speed) => {
              el.value = speed
            }, broker.serviceConfig.ubdPlayer.speed);

            this.logger.debug('Battle started');
            await page.click('#start');
            await page.waitFor('#output', {timeout: broker.serviceConfig.ubdPlayer.timeout});
            this.logger.debug('Battle completed');
            const element = await page.$("#output");
            const text = await page.evaluate((element) => element.innerHTML, element);
            await page.close();
            const jsonResult = JSON.parse(text)
            if(task.refData) {
              jsonResult.refData = task.refData;
            }
            let eventName = "ubdPlayer.battle";
            if(task.event) {
              eventName = eventName + ("." + task.event)
            } else {
              eventName = eventName + ".default"
            }
            broker.broadcast(eventName, jsonResult);
            this.isBusy = false;
            let dt = new Date().getTime() - this.processingStartTime;
            this.logger.debug(`Battle completed after ${dt}ms`)
          } catch (err) {
            this.logger.debug('Unable to finish the battle');
            this.logger.warn(err);
            this.isBusy = false;
          }
        }, broker.serviceConfig.ubdPlayer.queueQueryTime)

      },
      stopped: () => {
        this.server.close();
        if(this.loop) {
          clearInterval(this.loop);
          this.loop = null;
        }
        if(this.browser) {
          this.browser.close();
          this.browser = null;
        }
      }
    });
    this.queue = []
    this.queueLimit = broker.serviceConfig.ubdPlayer.queueLimit
  }

  getQueueLength() {
    return this.queue.length;
  }

  async scheduleBattle(ctx) {
    let result = await ctx.call('ubdValidator.validate', {ubd: ctx.params.ubd})
    if(!result.valid) {
      throw new ValidationError('Invalid ubd to play!')
    }
    if(this.queue.length >= this.queueLimit) {
      throw new MoleculerError('UbdPlayer queue limit exceeded')
    }
    this.queue.push({
      ubd: ctx.params.ubd,
      event: ctx.params.event || "",
      refData: ctx.params.refData || undefined,
    });
    this.logger.debug('Battle scheduled. Queue length: ' + this.queue.length)
  }

}

module.exports = UbdPlayer;
