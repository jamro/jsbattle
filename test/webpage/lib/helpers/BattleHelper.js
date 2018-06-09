module.exports = function(casper, test) {
  this._casper = casper;
  this._test = test;

  this.hasBattlefield = function() {
    var count = this._casper.getElementsInfo('canvas.battlefield').length;
    return count > 0;
  }
};
