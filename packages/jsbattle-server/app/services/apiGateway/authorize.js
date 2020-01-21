
const {
  UnAuthorizedError,
  ForbiddenError,
  ERR_NO_TOKEN,
  ERR_INVALID_TOKEN
} = require("moleculer-web").Errors;

module.exports = () => {

  async function authorize(ctx, route, req) {
    let roles = [];
    switch(route.path) {
      case '/admin':
        roles = ['admin'];
        break;
      default:
        roles = [
          'admin',
          'user'
        ];
        break;
    }
    let authHeader = req.headers["authorization"];
    let token;
    if(authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.slice(7);
    }
    if(!token && req.cookies) {
      token = req.cookies.JWT_TOKEN;
    }
    if (token) {
      try {
        let user = await ctx.call('auth.resolveToken', {token});
        if(roles.indexOf(user.role) === -1) {
          throw new ForbiddenError();
        }
        ctx.meta.user = user; // eslint-disable-line require-atomic-updates
      } catch (err) {
        throw new UnAuthorizedError(ERR_INVALID_TOKEN);
      }
    } else {
      throw new UnAuthorizedError(ERR_NO_TOKEN);
    }
  }

  return authorize;
}
