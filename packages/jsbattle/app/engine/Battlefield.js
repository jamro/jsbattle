'use strict';

import seedrandom from "seedrandom";

export default class Battlefield {

  constructor(width, height) {
    this._width = null;
    this._height = null;
    this._startSlotList = [];
    this._offsetX = 0;
    this._offsetY = 0;
  }

  setSize(width, height) {
    this._width = width-this.margin*2;
    this._height = height-this.margin*2;


  }

  randomize(seed) { // remember to call it after setSize !!!
    if(seed === undefined) {
      seed = (new Date()).getTime() + Math.round(Math.random()*1000000);
    }
    let rng = seedrandom(seed);

    this._offsetX = Math.round(rng()*10000-5000);
    this._offsetY = Math.round(rng()*10000-5000);
    
    // generate list of start slots
    this._startSlotList = [];
    let slotSize = 90;
    for(let x = this.minX + slotSize; x < this.maxX - slotSize; x += slotSize) {
      for(let y = this.minY + slotSize; y < this.maxY - slotSize; y += slotSize) {
        this._startSlotList.push({x: x, y: y});
      }
    }
    // shuffle start slots
    let currentIndex = this._startSlotList.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(rng() * currentIndex);
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
}
