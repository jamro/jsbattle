'use strict';

module.exports = class EventStore {

  constructor() {
    this._data = [];
  }

  add(index, event) {
    if(!this._data[index]) {
      this._data[index] = [];
    }
    this._data[index].push(event);
  }

  get(index) {
    if(!this._data[index]) {
      this._data[index] = [];
    }
    return this._data[index];
  }

  clear(index) {
    this._data = [];  
  }

};
