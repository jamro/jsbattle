var config = require('../config.js');
var HomeHelper = require('../lib/helpers/HomeHelper.js');

casper.test.begin('Total amount of tanks in a battle is updated', function suite(test) {
  var homeHelper = new HomeHelper(casper, test);

  casper.start(config.BASE_URL + '#stateless', function() {
    test.assertEquals(
      homeHelper.getTankInTheBattle(),
      config.DEFAULT_TANK_COUNT,
      "One from each type of tanks is selected by default"
    );
  });
  casper.then(function() {
    this.click(".numeric-input button.plus");
    this.click(".numeric-input button.plus");
  });
  casper.then(function() {
    test.assertEquals(
      homeHelper.getTankInTheBattle(),
      config.DEFAULT_TANK_COUNT+2,
      "Amount of tanks increased"
    );
  });
  casper.then(function() {
    homeHelper.clickTankCounterMinus(1);
  });
  casper.then(function() {
    test.assertEquals(
      homeHelper.getTankInTheBattle(),
      config.DEFAULT_TANK_COUNT+2-1,
      "Amount of tanks decreased"
    );
  });


  casper.run(function() {
    test.done();
  });
})
