module.exports = (config) => ({
  name: "ubdPlayer",
  settings: {
    ubdPlayer: config.ubdPlayer
  },
  actions: {
    getInfo: require("./actions/getInfo.js"),
  },
  started: require("./events/onStart.js"),
  stopped: require("./events/onStop.js")
});
