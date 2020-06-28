const { ValidationError } = require("moleculer").Errors;
const _ = require('lodash');
const jsonwebtoken = require("jsonwebtoken");

module.exports = function(ctx) {
  if(!ctx.params.user) {
    throw new ValidationError('user parameter is required', 400);
  }
  let user = _.pick(ctx.params.user, this.JWT_FIELDS)
  return {
    token: jsonwebtoken.sign(
      user,
      this.JWT_SECRET,
      {
        expiresIn: '1h'
      }
    )
  }
}
