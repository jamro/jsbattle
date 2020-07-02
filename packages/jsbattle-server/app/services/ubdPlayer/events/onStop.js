module.exports = function() {
  if(this.server) {
    this.server.close();
  }
  if(this.loop) {
    clearInterval(this.loop);
    this.loop = null;
  }
  if(this.browser) {
    this.browser.close();
    this.browser = null;
  }
}
