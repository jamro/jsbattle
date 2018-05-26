var config = require('../config.js');
var HomeHelper = require('../lib/helpers/HomeHelper.js');

casper.test.begin('Ading AI Scripts', function suite(test) {
  var homeHelper = new HomeHelper(casper, test);
  casper.on("page.error", function(msg, trace) {
    this.echo("Error: " + msg, "ERROR");
  });

  casper.start(config.BASE_URL + '#stateless', function() {
    test.assertEquals(
      homeHelper.getTankTableLength(),
      config.DEFAULT_TANK_COUNT,
      "Table tank contains " + config.DEFAULT_TANK_COUNT + " tanks"
    );
  });
  casper.then(function() {
    homeHelper.clickCreateTank();
  })
  casper.then(function() {
    var targetCount = config.DEFAULT_TANK_COUNT+1;
    test.assertEquals(
      homeHelper.getTankTableLength(),
      targetCount,
      "Table tank contains " + targetCount + " tanks"
    );
  })

  casper.then(function() {
    for(var i=0; i < 20; i++) {
      homeHelper.clickCreateTank()
    }
  })
  casper.then(function() {
    var targetCount = config.DEFAULT_TANK_COUNT+21;
    test.assertEquals(
      homeHelper.getTankTableLength(),
      targetCount,
      "Table tank contains " + targetCount + " tanks"
    );
    var tankNames = homeHelper.getTankTableNames();
    tankNames = tankNames.filter(function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    });
    test.assertEquals(
      tankNames.length,
      targetCount,
      "All tank names are unique"
    );
  })

  casper.run(function() {
    test.done();
  });
})
