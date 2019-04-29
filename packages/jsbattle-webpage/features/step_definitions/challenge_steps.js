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
Given('all challenges unlocked', async function () {
  await this.client.page.evaluate(() => {
    appController.unlockAllChallenges();
  });
});

// WHEN ------------------------------------------------------------------------
When('open challenge {int}', async function (index) {
  let css = ".challenge-list > li:nth-child(" + index + ") > button";
  await this.client.page.waitFor(css);
  await this.client.page.click(css);
});

When('retry challenge', async function () {
  let css = ".retry-challenge";
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

When('close challenge info', async function () {
  function delay(time) {
    return new Promise(function(resolve) {
       setTimeout(resolve, time)
    });
  }
  let css = ".close-challenge-info";
  await this.client.page.waitForSelector(css, {visible:true});
  await delay(300)
  await this.client.page.click(css);
  await delay(300)
});

When('open challenge info', async function () {
  function delay(time) {
    return new Promise(function(resolve) {
       setTimeout(resolve, time)
    });
  }
  let css = ".open-challenge-info";
  await this.client.page.waitForSelector(css, {visible:true});
  await this.client.page.click(css);
  await delay(300)
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

Then('challenge info is shown', async function () {
  await this.client.page.waitFor('.modal', {visible: true});
  let result = await this.client.page.evaluate(() => {
    const element = document.querySelector('.modal');
    return (element != null);
  });
  expect(result).to.be.ok;
});

Then('challenge info is not shown', async function () {
  function delay(time) {
    return new Promise(function(resolve) {
       setTimeout(resolve, time)
    });
  }
  await delay(500);
  await this.client.page.waitFor('.modal', {visible: false});
  let result = await this.client.page.evaluate(() => {
    const element = document.querySelector('.modal');
    return (element != null);
  });
  expect(result).to.be.ok;
});

Then('challenge info description is not empty', async function () {
  await this.client.page.waitFor('.modal-body', {visible: true});
  let result = await this.client.page.evaluate(() => {
    const html = document.querySelector('.modal-body').innerHTML;;
    return html;
  });
  expect(result).to.be.not.empty;
});

Then('all links in challenge info work', async function () {
  await this.client.page.waitFor('.modal-body', {visible: true});
  let result = await this.client.page.evaluate(() => {
    const links = document.querySelectorAll('.modal-body a');
    return Object.values(links).map(el => el.href);
  });

  let testPage = await this.client.browser.newPage();
  testPage.on('response', (response) => {
    expect(response.ok(), "Status " + response.status() + " during opening " + response.url()).to.be.ok;
  })
  for(let url of result) {
    await testPage.goto(url);
    await testPage.waitFor('body');
  }
  await testPage.close();

});
