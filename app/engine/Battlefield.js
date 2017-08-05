'use strict';

module.exports = class Battlefield {

  constructor(width, height) {
    this._width = null;
    this._height = null;
    this._startSlotList = [];
    this._offsetX = Math.round(Math.random()*10000-5000);
    this._offsetY = Math.round(Math.random()*10000-5000);
  }

  setSize(width, height) {
    this._width = width-this.margin*2;
    this._height = height-this.margin*2;

    // generate list of start slots
    this._startSlotList = [];
    var slotSize = 90;
    for(var x = this.minX + slotSize; x < this.maxX - slotSize; x += slotSize) {
      for(var y = this.minY + slotSize; y < this.maxY - slotSize; y += slotSize) {
        this._startSlotList.push({x: x, y: y});
      }
    }
    // shuffle start slots
    var currentIndex = this._startSlotList.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = this._startSlotList[currentIndex];
      this._startSlotList[currentIndex] = this._startSlotList[randomIndex];
      this._startSlotList[randomIndex] = temporaryValue;
    }
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  get margin() {
    return 25;
  }

  get minX() {
    return this._offsetX + this.margin;
  }

  get minY() {
    return this._offsetY + this.margin;
  }

  get maxX() {
    return this._offsetX + this._width + this.margin;
  }

  get maxY() {
    return this._offsetY + this._height + this.margin;
  }

  get offsetX() {
    return this._offsetX;
  }

  get offsetY() {
    return this._offsetY;
  }

  getStartSlot() {
    if(this._startSlotList.length) {
      return this._startSlotList.pop();
    }
    return null;
  }
};
