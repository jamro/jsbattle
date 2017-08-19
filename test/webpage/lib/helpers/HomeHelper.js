module.exports = function(casper, test) {
  this._casper = casper;
  this._test = test;

  this.getTankInTheBattle = function() {
    var count = this._casper.getElementInfo(".tank-counter").html;
    return Number(count);
  }

  this.getTankTableLength = function() {
    var count = this._casper.getElementsInfo('table.tank-table tbody tr').length;
    return Number(count);
  }

  this.getTankCounterValue = function(index) {
    var value = this._casper.getElementAttribute("table.tank-table tbody tr:nth-of-type(" + index + ") .numeric-input input", "value");
    value = Number(value);
    return value;
  }

  this.getTankTableNames = function() {
    var data = this._casper.getElementsInfo('table.tank-table tbody tr .tank-name');
    data = data.map(function(v) {
      return v.html
    })
    return data;
  }

  this.clickTankCounterPlus = function(index) {
    this._casper.click("table.tank-table tbody tr:nth-of-type(" + index + ") .numeric-input button.plus");
  }

  this.clickTankCounterMinus = function(index) {
    this._casper.click("table.tank-table tbody tr:nth-of-type(" + index + ") .numeric-input button.minus");
  }

  this.clickCreateTank = function() {
    this._casper.click("button.create-tank");
  }

  this.clickTankRemove = function(index) {
    this._casper.click("table.tank-table tbody tr:nth-of-type(" + index + ") button.tank-remove");
  }

  this.clickTankRemoveConfirm = function(index) {
    this._casper.click("table.tank-table tbody tr:nth-of-type(" + index + ") button.tank-remove-confirm-yes");
  }

  this.clickTankRemoveCancel = function(index) {
    this._casper.click("table.tank-table tbody tr:nth-of-type(" + index + ") button.tank-remove-confirm-no");
  }

  this.clickTankEdit = function(index) {
    this._casper.click("table.tank-table tbody tr:nth-of-type(" + index + ") button.tank-edit");
  }
};
