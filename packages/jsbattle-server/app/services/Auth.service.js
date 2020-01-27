const Service = require("moleculer").Service;
const { ValidationError } = require("moleculer").Errors;
const jsonwebtoken = require("jsonwebtoken");
const _ = require('lodash');
const crypto = require('crypto');

const JWT_SECRET = crypto.randomBytes(256).toString('base64');
const JWT_FIELDS = [
  'id',
  'username',
  'role'
];

class AuthService extends Service {

  constructor(broker) {
    super(broker);

    this.parseServiceSchema({
      name: "auth",
      actions: {
        authorize: this.authorize,
        resolveToken: this.resolveToken,
        whoami: this.whoami,
        getAuthMethods: this.getAuthMethods
      },
      events: {
        "user.login": async (userId) => {
          await broker.call("userStore.update", {id: userId, lastLoginAt: new Date()});
        }
      }
    });
  }

  getAuthMethods(ctx) {
    const providerName = {
      github: "GitHub",
      facebook: "Facebook",
      google: "Google",
      twitter: "Twitter",
      linkedin: "LinkedIn",
      slack: "Slack"
    }

    const authConfig = ctx.broker.serviceConfig.auth
    const webConfig = ctx.broker.serviceConfig.web
    if(!authConfig.enabled) {
      return {};
    }
    let result = {};
    for(let i=0; i < authConfig.providers.length; i++) {
      let provider = authConfig.providers[i]
      result[provider.name] = {
        name: providerName[provider.name] || provider.name,
        url: webConfig.baseUrl + '/auth/' + provider.name
      }
    }
    return result;
  }

  whoami(ctx) {
    if(!ctx.meta.user || !ctx.meta.user.id) {
      return {
        "username": "guest",
        "displayName": "Guest",
        "provider": "",
        "extUserId": "",
        "email": "",
        "role": "guest",
        "createdAt": new Date(),
        "lastLoginAt": new Date()
      };
    }
    let userId = ctx.meta.user.id;
    let user = ctx.call('userStore.get', {id: userId});
    return user;
  }

  authorize(ctx) {
    if(!ctx.params.user) {
      throw new ValidationError('user parameter is required', 400);
    }
    let user = _.pick(ctx.params.user, JWT_FIELDS)
    return {
      token: jsonwebtoken.sign(
        user,
        JWT_SECRET,
        {
          expiresIn: '1d'
        }
      )
    }
  }

  resolveToken(ctx) {
    if(!ctx.params.token) {
      throw new ValidationError('token parameter is required', 400);
    }
    let user = jsonwebtoken.verify(ctx.params.token, JWT_SECRET);
    return _.pick(user, JWT_FIELDS);
  }

}

module.exports = AuthService;
