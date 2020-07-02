const crypto = require('crypto');

module.exports = (config) => ({
  name: "auth",
  actions: {
    authorize: require('./actions/authorize.js'),
    resolveToken: require('./actions/resolveToken.js'),
    whoami: require('./actions/whoami.js'),
    getAuthMethods: require('./actions/getAuthMethods.js')
  },
  settings: {
    $secureSettings: [
      'jwtSecret',
      'jwtFields',
      'auth'
    ],
    jwtSecret: crypto.randomBytes(256).toString('base64'),
    jwtFields: [
      'id',
      'username',
      'role'
    ],
    auth: config.auth,
    web: {
      baseUrl: config.web.baseUrl
    }
  },
  events: {
    "user.login": require('./events/onUserLogin.js')
  }
});
