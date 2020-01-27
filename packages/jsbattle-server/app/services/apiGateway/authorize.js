
const {
  UnAuthorizedError,
  ForbiddenError,
  ERR_NO_TOKEN,
  ERR_INVALID_TOKEN
} = require("moleculer-web").Errors;

const guestUser = {
  username: 'guest',
  role: 'guest'
}

module.exports = (rejectOnFail) => {

  async function authorize(ctx, route, req) {
    let roles = [];
    let publicAccess = false;
    switch(route.path) {
      case '/admin':
        roles = ['admin'];
        break;
      default:
        publicAccess = true;
        roles = [
          'admin',
          'user',
          'guest'
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
          if(rejectOnFail && !publicAccess) {
            throw new ForbiddenError();
          } else {
            ctx.meta.user = guestUser; // eslint-disable-line require-atomic-updates
          }
        }
        ctx.meta.user = user; // eslint-disable-line require-atomic-updates
      } catch (err) {
        if(rejectOnFail && !publicAccess) {
          throw new UnAuthorizedError(ERR_INVALID_TOKEN);
        } else {
          ctx.meta.user = guestUser; // eslint-disable-line require-atomic-updates
        }
      }
    } else if(rejectOnFail && !publicAccess) {
      throw new UnAuthorizedError(ERR_NO_TOKEN);
    } else {
      ctx.meta.user = guestUser;
    }
  }

  return authorize;
}
