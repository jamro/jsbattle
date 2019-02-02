module.exports = {
  getVersion: function(v) {
    return require(`./dist/schema/ubd-schema-v${v}.json`);
  }
};
