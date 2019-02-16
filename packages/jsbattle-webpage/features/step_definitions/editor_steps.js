const expect = require('chai').expect
const {After, Given, When, Then } = require('cucumber');
const puppeteer = require('puppeteer');

var editorHelper = {
  getAiScriptNames: async (page) => {
    let result = await page.evaluate(() => {
      const names = document.querySelectorAll('table.ai-table tbody tr .tank-name');
      return Object.values(names).map((el) => el.innerHTML)
    });
    return result;
  },
  editAiScript: async (page, index) => {
    let css = "table.ai-table tbody tr:nth-of-type(" + (index) + ") button.tank-edit";
    await page.waitFor(css);
    await page.click(css);
  }
};

// GIVEN -----------------------------------------------------------------------
Given('there are {int} AI scripts', async function (count) {
  let css = "button.create-tank";
  await this.client.page.waitFor(css);

  for(let i=0; i < count; i++) {
    await this.client.page.click(css);
  }
});

Given('there are AI scripts named {stringList}', async function (newNames) {
  await this.client.page.evaluate((newNames) => {
    for(let i in newNames) {
      appController.createTank();
    }
  }, newNames);
  let oldNames = await editorHelper.getAiScriptNames(this.client.page);
  await this.client.page.evaluate((oldNames, newNames) => {
    for(let i in newNames) {
      appController.renameAiScript(newNames[i], oldNames[i])
    }
  }, oldNames, newNames);
});

Given('AI Script no {int} is open', function (index) {
  editorHelper.editAiScript(this.client.page, index);
});

Given('code of AI Script {string} is {string}', async function (name, code) {
  await this.client.page.evaluate((name, code) => {
    appController.setAiScript(name, code);
  }, name, code);
});

// WHEN ------------------------------------------------------------------------
When('click create tank button', async function () {
  let css = "button.create-tank";
  await this.client.page.waitFor(css);
  await this.client.page.click(css);
});

When('click remove button of AI Script no {int}', async function (index) {
  let css = "table.ai-table tbody tr:nth-of-type(" + index + ") button.tank-remove";
  await this.client.page.waitFor(css);
  await this.client.page.click(css);
});

When('confirm removal of AI Script no {int}', async function (index) {
  css = "table.ai-table tbody tr:nth-of-type(" + index + ") button.tank-remove-confirm-yes";
  await this.client.page.waitFor(css);
  await this.client.page.click(css);
});

When('abort removal of AI Script no {int}', async function (index) {
  css = "table.ai-table tbody tr:nth-of-type(" + index + ") button.tank-remove-confirm-no";
  await this.client.page.waitFor(css);
  await this.client.page.click(css);
});

When('click AI Script rename button', async function () {
  let css = ".rename-button";
  await this.client.page.waitFor(css);
  await this.client.page.click(css);
});

When('type {string} as AI Script name', async function (name) {
  css = '.ai-name-input';
  await this.client.page.waitFor(css);
  await this.client.page.type(css, name);
});

When('confirm renaming AI Script name', async function () {
  let css = '.button-name-confirm';
  await this.client.page.waitFor(css);
  await this.client.page.click(css);
});

When('abort renaming AI Script name', async function () {
  let css = '.button-name-cancel';
  await this.client.page.waitFor(css);
  await this.client.page.click(css);
});

When('stop editing AI Script', async function () {
  let css = ".editor-close";
  await this.client.page.waitFor(css);
  await this.client.page.click(css);
});

When('type {string} in AI Script editor', async function (code) {
  let css = ".code-editor";
  await this.client.page.waitFor(css);
  await this.client.page.evaluate((css, code) => {
    const txt = document.querySelector(css);
    txt.codeMirror.setValue(code);
  }, css, code);
});

When('click save AI Script', async function () {
  let css = "button.editor-save";
  await this.client.page.waitFor(css);
  await this.client.page.click(css);
});

When('edit AI Script no {int}', async function (index) {
  let css = "table.ai-table tbody tr:nth-of-type(" + index + ") button.tank-edit";
  await this.client.page.waitFor(css);
  await this.client.page.click(css);
});

When('confirm saving AI Script on exit warning', async function () {
  let css = ".editor-exit-warn-save";
  await this.client.page.waitFor(css);
  await this.client.page.click(css);
});


When('abort saving AI Script on exit warning', async function () {
  let css = ".editor-exit-warn-close";
  await this.client.page.waitFor(css);
  await this.client.page.click(css);
});

// THEN ------------------------------------------------------------------------
Then('list of AI scripts contains {int} item(s)', async function (count) {
  let names = await editorHelper.getAiScriptNames(this.client.page);
  expect(names.length).to.be.equal(count);
});

Then('all tank names are unique', async function () {
  let names = await editorHelper.getAiScriptNames(this.client.page);

  let allNamesCount = names.length;
  names = names.filter((value, index, self) => (self.indexOf(value) === index));
  let uniqueNamesCount = names.length;

  expect(allNamesCount - uniqueNamesCount, "duplicated tanks names").to.be.equal(0);

});

Then('list of AI scripts consists of {stringList}', async function (scripts) {
  let names = await editorHelper.getAiScriptNames(this.client.page);
  expect(names).to.have.members(scripts);
});

Then('there is an error {string}', async function (msg) {
  let error = await this.client.page.evaluate(() => {
    const el = document.querySelector('.alert-danger');
    return el.innerHTML;
  });

  expect(error).to.match(new RegExp(msg, "i"));
});

Then('AI Script editor contains {string}', async function (expectedCode) {
  let css = ".code-editor";
  await this.client.page.waitFor(css);
  let code = await this.client.page.evaluate((css) => {
    const txt = document.querySelector(css);
    return txt.codeMirror.getValue();
  }, css);

  expect(code).to.be.equal(expectedCode);

});
