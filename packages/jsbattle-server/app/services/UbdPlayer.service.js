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
    this.config = broker.serviceConfig.ubdPlayer;
    this.parseServiceSchema({
      name: "ubdPlayer",
      dependencies: ['ubdValidator'],
      actions: {
        scheduleBattle: this.scheduleBattle,
        getQueueLength: this.getQueueLength,
        getInfo: this.getInfo,
      },
      started: async () => {
        await insttallPuppeteer(this.logger);

        // host frontend
        this.app = express();
        this.app.use(express.static(path.join(__dirname, 'ubdPlayer', 'www')))
        this.server = this.app.listen(this.config.port, 'localhost', () => this.logger.info(`UbdPlayer started at http://localhost:${this.config.port}`))

        // start browser
        this.browser = await puppeteer.launch();
        this.logger.info(`Starting player at ${broker.serviceConfig.ubdPlayer.speed}x speed`);
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
          let task = this.queue.shift();
          try {
            this.processingStartTime = new Date().getTime();
            this.isBusy = true;
            this.logger.info('Starting a battle...')
            let ubd = task.ubd;
            let page = await this.browser.newPage();
            page.on('console', (message) => this.logger.debug(`${message.type().substr(0, 3).toUpperCase()} ${message.text()}`));
            page.on('pageerror', ({ message }) => this.logger.debug(message));
            await page.goto('http://localhost:' + this.config.port);
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
            broker.broadcast(eventName, jsonResult);
            this.isBusy = false;
          } catch (err) {
            this.logger.warn('Unable to finish the battle');
            this.logger.warn(err);
            this.logger.debug('UBD that failed: ' + JSON.stringify(task.ubd));
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

  async getInfo(ctx) {
    let browser = {
      initialized: false,
      product: puppeteer.product,
      isBusy: this.isBusy,
      queueLength: this.queue.length,
      config: this.config
    };

    let processInfo = null;
    if(this.browser) {
      browser.initialized = true;
      browser.isConnected = await this.browser.isConnected();
      browser.pagesCount = (await this.browser.pages()).length;
      browser.targetsCount = (await this.browser.targets()).length;
      browser.contextsCount = (await this.browser.browserContexts()).length;
      browser.userAgent = await this.browser.userAgent();
      browser.version = await this.browser.version();
      let proc = this.browser.process();
      if(proc) {
        browser.pid = proc.pid
      }
    }

    return {
      browser
    }
  }

}

module.exports = UbdPlayer;
