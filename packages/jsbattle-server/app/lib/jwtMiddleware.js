module.exports = async (ctx, route, req, res, data) => {
  if(ctx.meta.user) {
    let logger = ctx.broker.getLogger('jwt_middleware');
    const response = await ctx.call('auth.authorize', { user: ctx.meta.user });
    const token = response.token;
    if(token) {
      logger.trace('Setting JWT token in response header');
      res.cookie('JWT_TOKEN', token, { httpOnly: true, maxAge: 60*60*1000 })
    } else {
      logger.trace('No JWT token to set in response header');
    }
  }
  return data;
}
