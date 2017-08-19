var config = require('../config.js');
var HomeHelper = require('../lib/helpers/HomeHelper.js');

casper.test.begin('Removing AI Scripts', function suite(test) {
  var homeHelper = new HomeHelper(casper, test);

  casper.start(config.BASE_URL + '#stateless', function() {
    homeHelper.clickCreateTank();
    homeHelper.clickCreateTank();
  });
  casper.then(function() {
    homeHelper.clickTankRemove(1);
  });
  casper.then(function() {
    homeHelper.clickTankRemoveCancel(1);
  });
  casper.then(function() {
    var targetCount = config.DEFAULT_TANK_COUNT+2;
    test.assertEquals(
      homeHelper.getTankTableLength(),
      targetCount,
      "Tank not removed"
    );
  });
  casper.then(function() {
    homeHelper.clickTankRemove(1);
  });
  casper.then(function() {
    homeHelper.clickTankRemoveConfirm(1);
  });
  casper.then(function() {
    var targetCount = config.DEFAULT_TANK_COUNT+1;
    test.assertEquals(
      homeHelper.getTankTableLength(),
      targetCount,
      "Tank removed"
    );
  })

  casper.run(function() {
    test.done();
  });
})
