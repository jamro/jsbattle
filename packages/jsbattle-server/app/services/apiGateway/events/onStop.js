module.exports = function() {
  if(this.server) {
    this.server.close();
    this.server = null;
  }
}
