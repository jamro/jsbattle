const expect = require('chai').expect
const {After, Given, When, Then } = require('cucumber');
const puppeteer = require('puppeteer');
const urlLib = require('url');


var challengeHelper = {
  getChallengeList: async (page) => {
    return await page.evaluate(() => {
      let data = [];
      const rows = document.querySelectorAll('.challenge-list-item');
      let index = 1;
      for(let row of rows) {
        let item = {
          index: index++,
          completed: !!row.querySelector('.completed-badge'),
          enabled: !row.querySelector('button').disabled
        };
        data.push(item);
      }
      return data;
    });
  }
};
// GIVEN -----------------------------------------------------------------------

// WHEN ------------------------------------------------------------------------
When('open challenge {int}', async function (index) {
  let css = ".challenge-list > li:nth-child(" + index + ") > button";
  await this.client.page.waitFor(css);
  await this.client.page.click(css);
});

When('start current challenge', async function () {
  let css = ".editor-fight";
  await this.client.page.waitFor(css);
  await this.client.page.click(css);
});

When('click next challenge', async function () {
  let css = ".next-challenge";
  await this.client.page.waitFor(css);
  await this.client.page.click(css);
});

// THEN ------------------------------------------------------------------------
Then('list of challenges contains {int} items', async function (count) {
  let data = await challengeHelper.getChallengeList(this.client.page);
  expect(data.length).to.be.equal(count);
});

Then('challenge {stringList} are unlocked', async function (indexList) {
  indexList = indexList.map(item => Number(item));
  let data = await challengeHelper.getChallengeList(this.client.page);
  data = data.filter((item) => (indexList.indexOf(item.index) != -1));
  for(let item of data) {
    expect(item.enabled).to.be.ok
  }
});

Then('challenge {stringList} are locked', async function (indexList) {
  indexList = indexList.map(item => Number(item));
  let data = await challengeHelper.getChallengeList(this.client.page);
  data = data.filter((item) => (indexList.indexOf(item.index) != -1));
  for(let item of data) {
    expect(item.enabled).to.not.be.ok
  }
});

Then('challenge {stringList} are incomplete', async function (indexList) {
  indexList = indexList.map(item => Number(item));
  let data = await challengeHelper.getChallengeList(this.client.page);
  data = data.filter((item) => (indexList.indexOf(item.index) != -1));
  for(let item of data) {
    expect(item.completed).to.not.be.ok
  }
});

Then('challenge {stringList} are complete', async function (indexList) {
  indexList = indexList.map(item => Number(item));
  let data = await challengeHelper.getChallengeList(this.client.page);
  data = data.filter((item) => (indexList.indexOf(item.index) != -1));
  for(let item of data) {
    expect(item.completed).to.be.ok
  }
});

Then('the challenge is lost', async function () {
  await this.client.page.waitFor('.result-msg');
  let result = await this.client.page.evaluate(() => {
    const element = document.querySelector('.defeat-msg');
    return (element != null);
  });
  expect(result).to.be.ok;
});

Then('the challenge is won', async function () {
  await this.client.page.waitFor('.result-msg');
  let result = await this.client.page.evaluate(() => {
    const element = document.querySelector('.congrats-msg');
    return (element != null);
  });
  expect(result).to.be.ok;
});
