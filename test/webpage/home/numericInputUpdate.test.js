var config = require('../config.js');
var HomeHelper = require('../lib/helpers/HomeHelper.js');

casper.test.begin('Numeric Input with tank count updates its value', function suite(test) {
  var homeHelper = new HomeHelper(casper, test);

  casper.start(config.BASE_URL + '#stateless', function() {
    for(var i=1; i <= config.DEFAULT_TANK_COUNT; i++) {
      test.assertEquals(
        homeHelper.getTankCounterValue(i),
        1,
        "default value of tank count selector #" + i + " is 1"
      );
    }

  });
  casper.then(function() {
    for(var i=0; i < 20; i++) {
      homeHelper.clickTankCounterMinus(3);
    }
  });
  casper.then(function() {
    test.assertEquals(
      homeHelper.getTankCounterValue(3),
      0,
      "value of #3 decreased"
    );
    test.assertEquals(
      homeHelper.getTankCounterValue(1),
      1,
      "value of #1 untouched"
    );
  });
  casper.then(function() {
    for(var i=0; i < 20; i++) {
      homeHelper.clickTankCounterPlus(2);
    }
  });
  casper.then(function() {
    test.assertEquals(
      homeHelper.getTankCounterValue(2),
      10,
      "max value limited to 10"
    );
    test.assertEquals(
      homeHelper.getTankCounterValue(1),
      1,
      "value of #1 untouched"
    );
  });
  casper.then(function() {
    for(var i=0; i < 4; i++) {
      homeHelper.clickTankCounterMinus(2);
    }
  });
  casper.then(function() {
    test.assertEquals(
      homeHelper.getTankCounterValue(2),
      6,
      "value decreased again"
    );
  });

  casper.run(function() {
    test.done();
  });
})
