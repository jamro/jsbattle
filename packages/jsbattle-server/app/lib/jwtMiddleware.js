module.exports = async (ctx, route, req, res, data) => {
  if(ctx.meta.user) {
    const response = await ctx.call('auth.authorize', { user: ctx.meta.user });
    const token = response.token;
    if(token) {
      res.cookie('JWT_TOKEN', token, { httpOnly: true, maxAge: 60*60*1000 })
    }
  }
  return data;
}
