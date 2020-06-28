const Service = require("moleculer").Service;
const crypto = require('crypto');
const onUserLogin = require('./events/onUserLogin.js');
const authorize = require('./actions/authorize.js');
const resolveToken = require('./actions/resolveToken.js');
const whoami = require('./actions/whoami.js');
const getAuthMethods = require('./actions/getAuthMethods.js');

const JWT_SECRET = crypto.randomBytes(256).toString('base64');
const JWT_FIELDS = [
  'id',
  'username',
  'role'
];

class AuthService extends Service {

  constructor(broker) {
    super(broker);
    this.broker = broker;
    this.JWT_SECRET = JWT_SECRET;
    this.JWT_FIELDS = JWT_FIELDS;
    this.parseServiceSchema({
      name: "auth",
      actions: {
        authorize: authorize.bind(this),
        resolveToken: resolveToken.bind(this),
        whoami: whoami.bind(this),
        getAuthMethods: getAuthMethods.bind(this)
      },
      events: {
        "user.login": onUserLogin.bind(this)
      }
    });
  }

}

module.exports = AuthService;
