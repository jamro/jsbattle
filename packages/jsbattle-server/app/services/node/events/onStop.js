
module.exports = function() {
  if(this.loopCallback) {
    clearInterval(this.loopCallback);
    this.loopCallback = null;
  }
}
