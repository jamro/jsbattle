module.exports = (config) => ({
  name: "apiGateway",
  started: require('./events/onStart.js'),
  settings: {
    $secureSettings: [
      'auth',
      'web.webroot'
    ],
    web: {
      baseUrl: config.web.baseUrl,
      corsOrigin: config.web.corsOrigin,
      gaCode: config.web.gaCode,
      port: config.web.port,
      host: config.web.host,
      webroot: config.web.webroot
    },
    auth: config.auth
  },
  events: {
    "client.**": require('./events/onClientEvent.js')
  },
  stopped: require('./events/onStop.js')
});
