const expect = require('chai').expect
const {After, Given, When, Then } = require('cucumber');



// GIVEN -----------------------------------------------------------------------


// WHEN ------------------------------------------------------------------------
When('Click Sign in button', async function () {
  const css = '.signin-button';
  await this.client.page.waitFor(css);
  await this.client.page.click(css);
});

When('Click {string} auth method', async function (authName) {
  const css = '.' + authName + '-auth-button';
  await this.client.page.waitFor(css);
  await this.client.page.click(css);
});

When('Click Logout button', async function () {
  const profileCss = '.profile-button';
  await this.client.page.waitFor(profileCss);
  await this.client.page.click(profileCss);
  const logoutCss = '.logout-button';
  await this.client.page.waitFor(logoutCss);
  await this.client.page.click(logoutCss);
});

// THEN ------------------------------------------------------------------------
Then('Sign in button is available', async function () {
  await this.client.page.waitFor('.signin-button');
});

Then('{string} auth method is available', async function (authName) {
  await this.client.page.waitFor('.' + authName + '-auth-button');
});

Then('user name is {string}', async function (expectedName) {
  const css = '.user-profile-name';
  await this.client.page.waitFor(css);
  let text = await this.client.page.evaluate((css) => {
    const el = document.querySelector(css);
    return el.textContent;
  }, css);

  expect(text).to.be.equal(expectedName);
});

Then('Admin link is not visible', async function () {
  const profileCss = '.profile-button';
  await this.client.page.waitFor(profileCss);
  await this.client.page.click(profileCss);

  let link = await this.client.page.evaluate(() => {
    return document.querySelector('.admin-button');
  });

  expect(link).to.be.equal(null);
});

Then('Admin link is visible', async function () {
  const profileCss = '.profile-button';
  await this.client.page.waitFor(profileCss);
  await this.client.page.click(profileCss);
  await this.client.page.waitFor('.admin-button');
});

Then('register form is shown', async function () {
  const css = '#register-form';
  await this.client.page.waitFor(css);
});

Then('register form is not shown', async function () {
  await new Promise((resolve) => setTimeout(resolve, 100))
  let count = await this.client.page.evaluate(() => {
    return document.querySelectorAll('#register-form').length;
  });
  expect(count).to.be.equal(0);
});
