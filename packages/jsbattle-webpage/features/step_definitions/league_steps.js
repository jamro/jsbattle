const expect = require('chai').expect
const {After, Given, When, Then } = require('cucumber');


When('click watch of league battle number {int}', async function (index) {
  let css = ".league-history table tr:nth-of-type(" + (index) + ") .watch-button";
  await this.client.page.waitFor(css);
  await this.client.page.click(css);
});

Then('League leaderboard is not empty', async function () {
  let result = await this.client.page.evaluate(() => {
    const elements = document.querySelectorAll('.table.leaderboard tr');
    return elements.length;
  });
  expect(result).to.be.above(2);
});
