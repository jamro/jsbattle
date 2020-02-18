const expect = require('chai').expect
const {After, Given, When, Then } = require('cucumber');
const puppeteer = require('puppeteer');


// GIVEN -----------------------------------------------------------------------
Given('battle quality set to {string}', async function (value) {
  await this.client.page.waitFor('.sim-quality-button');
  await this.client.page.click('.sim-quality-button');
  await this.client.page.waitFor('.sim-quality-' + value);
  await this.client.page.click('.sim-quality-' + value)
});

Given('battle speed set to {string}', async function (value) {
  await this.client.page.waitFor('.sim-speed-button');
  await this.client.page.click('.sim-speed-button');
  await this.client.page.waitFor('.sim-speed-' + value);
  await this.client.page.click('.sim-speed-' + value)
});

// WHEN ------------------------------------------------------------------------

When('wait for live code widget', async function () {
  await this.client.page.waitFor('.live-code');
});

// THEN ------------------------------------------------------------------------

When('restart the battle', async function () {
  let css = ".restart-battle";
  await this.client.page.waitFor(css);
  await this.client.page.click(css);
});
