const validators = require("../../validators");

module.exports = () => ({
  name: "ubdValidator",
  actions: {
    validate: {
      params: {
        ubd: validators.any()
      },
      handler: require("./actions/validate.js")
    }
  }
});
