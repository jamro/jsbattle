module.exports = async function(ctx) {
  let role = 'guest';
  if(!ctx.broker.serviceConfig.auth.enabled) {
    role = 'admin';
  }
  if(!ctx.meta.user || !ctx.meta.user.id) {
    return {
      "username": "guest",
      "displayName": "Guest",
      "provider": "",
      "extUserId": "",
      "email": "",
      "registered": false,
      "role": role,
      "createdAt": new Date(),
      "lastLoginAt": new Date()
    };
  }
  let userId = ctx.meta.user.id;
  let user = await ctx.call('userStore.get', {id: userId});
  return user;
}
