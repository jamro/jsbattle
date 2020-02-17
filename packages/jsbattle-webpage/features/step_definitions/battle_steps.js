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
When('battle view is displayed', async function () {
  await this.client.page.waitFor('canvas.jsbattle_battlefield');
});

When('battle is completed', async function () {
  await this.client.page.waitFor('canvas.jsbattle_battlefield', {visible:false});
});

When('battle results are shown', async function () {
  await this.client.page.waitFor('.winner-name');
});

When('press exit battle', async function () {
  let css = "button.exit-battle";
  await this.client.page.waitFor(css);
  await this.client.page.click(css);
});

When('click share battle', async function () {
  let css = "button#battle-share-button";
  await this.client.page.waitFor(css);
  await this.client.page.click(css);
});

When('wait for live code widget', async function () {
  await this.client.page.waitFor('.live-code');
});

// THEN ------------------------------------------------------------------------

Then('the winner tank is {string}', async function (targetName) {
  await this.client.page.waitFor('.winner-name');
  let actualName = await this.client.page.evaluate(() => {
    const name = document.querySelector('.winner-name');
    return name.innerHTML;
  });
  expect(actualName.toLowerCase()).to.contain(targetName.toLowerCase());
});

Then('tanks leaderboard is {stringList}', async function (targetNames) {
  let actualNames = await this.client.page.evaluate(() => {
    return Object.values(document.querySelectorAll('.battle-result-name')).map(el => el.innerHTML);
  });
  let actualName, targetName;
  let nameCount = [];
  for(targetName of targetNames) {
    nameCount[targetName] = 0;
    for(actualName of actualNames) {
      if(actualName.toLowerCase().includes(targetName.toLowerCase())) {
        nameCount[targetName]++;
      }
    }
    expect(nameCount[targetName]).to.be.above(0);
  }
});

Then('battle is not displayed', async function () {
  let view = await this.client.page.evaluate(() => {
    return document.querySelector('canvas.jsbattle_battlefield');
  });
  expect(view).to.not.be.ok;
});

Then('share link contains replay URL', async function () {
  await this.client.page.waitFor('input#battle-share-link');
  let result = await this.client.page.evaluate(() => {
    const name = document.querySelector('input#battle-share-link');
    return name.value;
  });
  expect(result).to.match(/^(http|https):\/\/.+replay=.+/);
});

Then('tank {string} score is {float}', async function (tankName, tankScore) {
  let names = await this.client.page.evaluate(() => {
    return Object.values(document.querySelectorAll('.battle-result-name')).map(el => el.innerHTML);
  });
  let scores = await this.client.page.evaluate(() => {
    return Object.values(document.querySelectorAll('.battle-result-score')).map(el => el.innerHTML);
  });
  let index = -1;
  for(let i=0; i < names.length; i++) {
    if(names[i].toLowerCase().includes(tankName.toLowerCase())) {
      index = i;
      break;
    }
  }
  expect(index, "Tank " + tankName + " found").to.not.be.equal(-1);
  let actualScore = Number(scores[index]);
  expect(actualScore).to.be.equal(tankScore);

});
