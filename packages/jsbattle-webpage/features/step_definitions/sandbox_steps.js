const expect = require('chai').expect
const {After, Given, When, Then } = require('cucumber');
const puppeteer = require('puppeteer');


var battlefieldHelper = {};
battlefieldHelper.getTankNames = async (page) => {
  await page.waitFor('table.ai-table tbody tr .tank-name');
  let result = await page.evaluate(() => {
    const names = document.querySelectorAll('table.ai-table tbody tr .tank-name');
    return Object.values(names).map((el) => el.innerHTML)
  });
  return result;
}


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

When('delete tank {string} and confirm', async function (name) {
  let names = await battlefieldHelper.getTankNames(this.client.page);
  let index = names.indexOf(name);
  expect(index, `tank "${name}" is on the tank list`).to.not.equal(-1);

  let css = "table.ai-table tbody tr:nth-of-type(" + (index+1) + ") .tank-remove";
  await this.client.page.waitFor(css);
  await this.client.page.click(css);

  css = "table.ai-table tbody tr:nth-of-type(" + (index+1) + ") .tank-remove-confirm-yes";
  await this.client.page.waitFor(css);
  await this.client.page.click(css);
});

When('delete tank {string} and abort', async function (name) {
  let names = await battlefieldHelper.getTankNames(this.client.page);
  let index = names.indexOf(name);
  expect(index, `tank "${name}" is on the tank list`).to.not.equal(-1);

  let css = "table.ai-table tbody tr:nth-of-type(" + (index+1) + ") button.tank-remove";
  await this.client.page.waitFor(css);
  await this.client.page.click(css);

  css = "table.ai-table tbody tr:nth-of-type(" + (index+1) + ") button.tank-remove-confirm-no";
  await this.client.page.waitFor(css);
  await this.client.page.click(css);
});

When('edit tank {string}', async function (name) {
  let names = await battlefieldHelper.getTankNames(this.client.page);
  let index = names.indexOf(name);
  expect(index, `tank "${name}" is on the tank list`).to.not.equal(-1);

  let css = "table.ai-table tbody tr:nth-of-type(" + (index+1) + ") button.tank-edit";
  await this.client.page.waitFor(css);
  await this.client.page.click(css);
});

When('wait for live code widget', async function () {
  await this.client.page.waitFor('.live-code');
});
// THEN ------------------------------------------------------------------------

Then('sandbox results are displayed', async function () {
  let css = ".battle-result";
  await this.client.page.waitFor(css);
  await this.client.page.click(css);
});

Then('winner tank is {string}', async function (name) {
  let result = await this.client.page.evaluate(() => {
    const name = document.querySelector('.winner-label');
    return name.innerHTML;
  });
  expect(result).to.be.equal(name);
});

Then('loser tank is {string}', async function (name) {
  let result = await this.client.page.evaluate(() => {
    const name = document.querySelector('.loser-label');
    return name.innerHTML;
  });
  expect(result).to.be.equal(name);
});

Then('restart the battle', async function () {
  let css = ".restart-battle";
  await this.client.page.waitFor(css);
  await this.client.page.click(css);
});
