const expect = require('chai').expect
const {After, Given, When, Then } = require('cucumber');
const puppeteer = require('puppeteer');


var battlefieldHelper = {};
battlefieldHelper.getTankNames = async (page) => {
  await page.waitFor('table.tank-table tbody tr .tank-name');
  let result = await page.evaluate(() => {
    const names = document.querySelectorAll('table.tank-table tbody tr .tank-name');
    return Object.values(names).map((el) => el.innerHTML)
  });
  return result;
}
battlefieldHelper.changeAmountOfTanks = async (page, name, direction) => {
  let names = await battlefieldHelper.getTankNames(page);
  let index = names.indexOf(name);
  expect(index, `tank "${name}" is on the tank list`).to.not.equal(-1);
  let css = "table.tank-table tbody tr:nth-of-type(" + (index+1) + ") .numeric-input button." + (direction > 0 ? "plus" : "minus");
  await page.waitFor(css);
  await page.click(css);
}


// GIVEN -----------------------------------------------------------------------
Given('no tanks selected for the battle', async function () {
  await this.client.page.evaluate(() => {
    let names = appController.stateHolder.state.battle.battleSet.data.map(e => e.name);
    names.forEach((name) => {
      appController.assignTanksToBattle(name, 0);
    });
  });
});

Given('tanks {stringList} selected for the battle', async function (initTanks) {
  await this.client.page.evaluate((initTanks) => {
    let names = appController.stateHolder.state.battle.battleSet.data.map(e => e.name);
    names.forEach((name) => {
      appController.assignTanksToBattle(name, (initTanks.indexOf(name) == -1) ? 0 : 1);
    });
  }, initTanks);
});

Given('{int} {string} tanks selected for the battle', async function (count, tank) {
  await this.client.page.evaluate((count, tank) => {
    appController.assignTanksToBattle(tank, count);
  }, count, tank);
});

// WHEN ------------------------------------------------------------------------
When('press plus button of {string} tank {int} time(s)', async function (name, count) {
  for(let i=0; i < count; i++) {
    await battlefieldHelper.changeAmountOfTanks(this.client.page, name, +1);
  }
});

When('press minus button of {string} tank {int} time(s)', async function (name, count) {
  for(let i=0; i < count; i++) {
    await battlefieldHelper.changeAmountOfTanks(this.client.page, name, -1);
  }
});

When('press plus button of {string} tank', async function (name) {
  await battlefieldHelper.changeAmountOfTanks(this.client.page, name, +1);
});

When('press minus button of {string} tank', async function (name) {
  await battlefieldHelper.changeAmountOfTanks(this.client.page, name, -1);
});

When('delete tank {string} and confirm', async function (name) {
  let names = await battlefieldHelper.getTankNames(this.client.page);
  let index = names.indexOf(name);
  expect(index, `tank "${name}" is on the tank list`).to.not.equal(-1);

  let css = "table.tank-table tbody tr:nth-of-type(" + (index+1) + ") button.tank-remove";
  await this.client.page.waitFor(css);
  await this.client.page.click(css);

  css = "table.tank-table tbody tr:nth-of-type(" + (index+1) + ") button.tank-remove-confirm-yes";
  await this.client.page.waitFor(css);
  await this.client.page.click(css);
});

When('delete tank {string} and abort', async function (name) {
  let names = await battlefieldHelper.getTankNames(this.client.page);
  let index = names.indexOf(name);
  expect(index, `tank "${name}" is on the tank list`).to.not.equal(-1);

  let css = "table.tank-table tbody tr:nth-of-type(" + (index+1) + ") button.tank-remove";
  await this.client.page.waitFor(css);
  await this.client.page.click(css);

  css = "table.tank-table tbody tr:nth-of-type(" + (index+1) + ") button.tank-remove-confirm-no";
  await this.client.page.waitFor(css);
  await this.client.page.click(css);
});

When('edit tank {string}', async function (name) {
  let names = await battlefieldHelper.getTankNames(this.client.page);
  let index = names.indexOf(name);
  expect(index, `tank "${name}" is on the tank list`).to.not.equal(-1);

  let css = "table.tank-table tbody tr:nth-of-type(" + (index+1) + ") button.tank-edit";
  await this.client.page.waitFor(css);
  await this.client.page.click(css);
});

When('select team mode', async function () {
  await this.client.page.waitFor("input.team-mode");
  let checked = await this.client.page.evaluate(() => {
    const checked = document.querySelector("input.team-mode").checked;
    return checked;
  });
  if(!checked) {
    await this.client.page.click("input.team-mode");
  }
});

When('deselect team mode', async function () {
  await this.client.page.waitFor("input.team-mode");
  let checked = await this.client.page.evaluate(() => {
    const checked = document.querySelector("input.team-mode").checked;
    return checked;
  });
  if(checked) {
    await this.client.page.click("input.team-mode");
  }
});

When('press play battle button', async function () {
  let css = "button.start-battle";
  await this.client.page.waitFor(css);
  await this.client.page.click(css);
});

// THEN ------------------------------------------------------------------------
Then('list of tanks consists of {stringList}', async function (expectedNames) {
  let actualNames = await battlefieldHelper.getTankNames(this.client.page);
  expect(actualNames).to.have.members(expectedNames);
});

Then('there is/are {int} tank(s) selected for a battle', async function (count) {
  await this.client.page.waitFor('.tank-counter');
  let total = await this.client.page.evaluate(() => {
    const button = document.querySelector('.tank-counter');
    return button.innerHTML;
  });
  total = Number(total);
  expect(total).to.be.equal(count);
});

Then('there is/are {int} {string} tank(s) selected', async function (count, name) {
  let names = await battlefieldHelper.getTankNames(this.client.page);
  let index = names.indexOf(name);
  expect(index, `tank "${name}" is on the tank list`).to.not.equal(-1);
  let css = "table.tank-table tbody tr:nth-of-type(" + (index+1) + ") .numeric-input input";
  await this.client.page.waitFor(css);
  let result = await this.client.page.evaluate((css) => {
    const field = document.querySelector(css);
    return Number(field.value);
  }, css);
  expect(result).to.be.equal(count);

});

Then('list of tanks contains {int} items', async function (count) {
  let actualNames = await battlefieldHelper.getTankNames(this.client.page);
  expect(actualNames.length).to.be.equal(count);
});

Then('list of tanks does not contain {string} tank', async function (name) {
  let names = await battlefieldHelper.getTankNames(this.client.page);
  let index = names.indexOf(name);
  expect(index, `tank "${name}" is not on the tank list`).to.be.equal(-1);
});

Then('Start Battle button is disabled', async function () {
  let isEnabled = await this.client.page.evaluate(() => {
    const button = document.querySelector('button.start-battle');
    return button.className.split(" ").indexOf("disabled") === -1;
  });
  expect(isEnabled).to.not.be.ok;
});

Then('Start Battle button is enabled', async function () {
  let isEnabled = await this.client.page.evaluate(() => {
    const button = document.querySelector('button.start-battle');
    return button.className.split(" ").indexOf("disabled") === -1;
  });
  expect(isEnabled).to.be.ok;
});

Then('list of tanks contains {string} tank', async function (name) {
  let names = await battlefieldHelper.getTankNames(this.client.page);
  let index = names.indexOf(name);
  expect(index, `tank "${name}" is on the tank list`).to.not.equal(-1);
});
