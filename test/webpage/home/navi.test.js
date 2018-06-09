var config = require('../config.js');
var NaviHelper = require('../lib/helpers/NaviHelper.js');

casper.options.verbose = true;

casper.test.begin('Speed & Quality can be changed', function suite(test) {
  var naviHelper = new NaviHelper(casper, test);

  casper.start(config.BASE_URL + '#stateless', function() {
    naviHelper.clickNavbarToggler();
  });

  casper.waitForSelector('.sim-quality-button', function() {
    test.assertEquals(
      naviHelper.getQualityLevel(),
      "Auto",
      "Default quality is Auto"
    );
  });

  naviHelper.changeSimQuality(1, function() {
    test.assertEquals(
      naviHelper.getQualityLevel(),
      "High",
      "Quality changed to High"
    );
  });
  naviHelper.changeSimQuality(0.5, function() {
    test.assertEquals(
      naviHelper.getQualityLevel(),
      "Normal",
      "Quality changed to Normal"
    );
  });
  naviHelper.changeSimQuality(0, function() {
    test.assertEquals(
      naviHelper.getQualityLevel(),
      "Low",
      "Quality changed to Low"
    );
  });
  naviHelper.changeSimQuality("auto", function() {
    test.assertEquals(
      naviHelper.getQualityLevel(),
      "Auto",
      "Quality changed to Auto"
    );
  });


  casper.waitForSelector('.sim-speed-button', function() {
    test.assertEquals(
      naviHelper.getSpeedLevel(),
      "Normal",
      "Default speed is Normal"
    );
  });

  naviHelper.changeSimSpeed(0.05, function() {
    test.assertEquals(
      naviHelper.getSpeedLevel(),
      "Super Slow",
      "Speed changed to Super Slow"
    );
  });
  naviHelper.changeSimSpeed(0.3, function() {
    test.assertEquals(
      naviHelper.getSpeedLevel(),
      "Slow",
      "Speed changed to Slow"
    );
  });
  naviHelper.changeSimSpeed(1, function() {
    test.assertEquals(
      naviHelper.getSpeedLevel(),
      "Normal",
      "Speed changed to Normal"
    );
  });
  naviHelper.changeSimSpeed(2, function() {
    test.assertEquals(
      naviHelper.getSpeedLevel(),
      "Fast",
      "Speed changed to Fast"
    );
  });
  naviHelper.changeSimSpeed(50, function() {
    test.assertEquals(
      naviHelper.getSpeedLevel(),
      "Super Fast",
      "Speed changed to Super Fast"
    );
  });

  casper.run(function() {
    test.done();
  });

})
