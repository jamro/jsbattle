const puppeteer = require('puppeteer');

module.exports = async function() {
  let browser = {
    initialized: false,
    product: puppeteer.product,
    isBusy: this.isBusy,
    config: this.config
  };

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
