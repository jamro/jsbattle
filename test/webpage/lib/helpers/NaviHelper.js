module.exports = function(casper, test) {
  this._casper = casper;
  this._test = test;

  this.getQualityLevel = function() {
    var value = this._casper.getElementInfo(".sim-quality-button").text;
    return value.replace(/^.*\: /, "").replace(/ *$/, "");
  }

  this.getSpeedLevel = function() {
    var value = this._casper.getElementInfo(".sim-speed-button").text;
    return value.replace(/^.*\: /, "").replace(/ *$/, "");
  }

  this.clickNavbarToggler = function() {
    this._casper.click(".navbar-toggler");
  }

  this.clickSimSpeed = function(speed) {
    speed = speed.toString().replace(".", "\\.");
    this._casper.click(".sim-speed-" + speed);
  }

  this.clickSimQuality = function(q) {
    q = q.toString().replace(".", "\\.");
    this._casper.click(".sim-quality-" + q);
  }

  this.toggleSimSpeedButton = function() {
    this._casper.click(".sim-speed-button");
  }

  this.toggleSimQualityButton = function() {
    this._casper.click(".sim-quality-button");
  }

  this.changeSimSpeed = function(speed, cb) {
    var self = this;
    this._casper.waitForSelector('.sim-speed-button', function() {
      self.toggleSimSpeedButton();
    });
    var speedSelector = '.sim-speed-' + speed.toString().replace(".", "\\.");
    this._casper.waitForSelector(speedSelector, function() {
      self.clickSimSpeed(speed);
    })
    this._casper.then(function() {
      if(cb) {
        cb();
      }
    });
  }

  this.changeSimQuality = function(quality, cb) {
    var self = this;
    this._casper.waitForSelector('.sim-quality-button', function() {
      self.toggleSimQualityButton();
    });
    var qualitySelector = '.sim-quality-' + quality.toString().replace(".", "\\.");
    this._casper.waitForSelector(qualitySelector, function() {
      self.clickSimQuality(quality);
    })
    this._casper.then(function() {
      if(cb) {
        cb();
      }
    });
  }
};
