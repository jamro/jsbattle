const expect = require('chai').expect
const {After, Given, When, Then } = require('cucumber');



// GIVEN -----------------------------------------------------------------------


// WHEN ------------------------------------------------------------------------

When('type {string} in {string} input', async function (value, selector) {
  await this.client.page.evaluate((selector, value) => {
    const tag = document.querySelector(selector);
    tag.value = value;
  }, selector, value);
});
When('click {string}', async function (selector) {
  await this.client.page.waitForSelector(selector);
  await this.client.page.click(selector);
});
// THEN ------------------------------------------------------------------------
Then('input {string} has value {string}', async function (selector, value) {
  let result = await this.client.page.evaluate((selector) => {
    const name = document.querySelector(selector);
    return name.value;
  }, selector);
  expect(result).to.be.equal(value);
});
