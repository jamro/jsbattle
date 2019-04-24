const expect = require('chai').expect
const {Before, Given, When, Then } = require('cucumber');


Before(async function (done) {
  this.gaEvents = [];
});

Then('GA event {string} is sent', function (eventSerial) {
  expect(this.gaEvents, "GA Events:\n - " + this.gaEvents.join("\n - ") + "\n\n").to.contain(eventSerial);
});
