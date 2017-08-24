export default class BootstrapRWD {

  constructor() {
    this._width = 0;
    this._size = 'xs';
    this._onChangeCallbackList = [];
    this._sizing={};
    this._sizing.xs = {min: 0, max: 768};
    this._sizing.sm = {min: 768, max: 992};
    this._sizing.md = {min: 992, max: 1200};
    this._sizing.lg = {min: 1200, max: Number.MAX_VALUE};
    this._onWindowResize();
    this._listener = () => this._onWindowResize();
    window.addEventListener('resize', this._listener);

  }

  get size() {
    return this._size;
  }

  equal(size) {
    return this._width >= this._sizing[size].min && this._width < this._sizing[size].max;
  }

  biggerThan(size) {
    return this._width >= this._sizing[size].max;
  }

  smallerThan(size) {
    return this._width < this._sizing[size].min;
  }

  equalOrBiggerThan(size) {
    return this._width >= this._sizing[size].min;
  }

  equalOrSmallerThan(size) {
    return this._width < this._sizing[size].max;
  }

  dispose() {
    window.removeEventListener('resize', this._listener);
  }

  onChange(callback) {
    this._onChangeCallbackList.push(callback);
  }

  _calculateSize(width) {
    for(let i in this._sizing) {
      if(width >= this._sizing[i].min && width < this._sizing[i].max) {
        return i;
      }
    }
    return 'xs';
  }

  _onWindowResize() {
    let oldSize = this._calculateSize(this._width);
    this._width = window.innerWidth;
    let newSize = this._calculateSize(this._width);
    this._size = newSize;
    if(newSize != oldSize) {
      for(let i in this._onChangeCallbackList) this._onChangeCallbackList[i](newSize);
    }
  }

}
