const Service = require("moleculer").Service;
const { ValidationError } = require("moleculer").Errors;
const { MoleculerClientError } = require("moleculer").Errors;
const jsonwebtoken = require("jsonwebtoken");
const _ = require('lodash')
const crypto = require('crypto');

const JWT_SECRET = crypto.randomBytes(256).toString('base64');

class AuthService extends Service {

  constructor(broker) {
    super(broker);

    this.parseServiceSchema({
      name: "auth",
      actions: {
        login: this.login,
        resolveToken: this.resolveToken
      }
    });
  }

  login(ctx) {
    if(!ctx.params.username) {
      throw new ValidationError('username parameter is required', 400);
    }
    if(!ctx.params.password) {
      throw new ValidationError('password parameter is required', 400);
    }
    if(ctx.params.username !== 'admin' || ctx.params.password !== 'secret' ) {
      throw new MoleculerClientError('Forbidden', 403);
    }
    return {
      token: jsonwebtoken.sign(
        {
          username: ctx.params.username,
          role: 'admin'
        },
        JWT_SECRET,
        {
          expiresIn: '1d'
        }
      )
    }
  }

  resolveToken(ctx) {
    let user = jsonwebtoken.verify(ctx.params.token, JWT_SECRET);
    return _.pick(user, [
      'username',
      'role'
    ]);
  }

}

module.exports = AuthService;
