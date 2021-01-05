module.exports = async function(ctx) {
  if(!ctx.meta.user || !ctx.meta.user.id) {
    return {
      "username": "guest",
      "displayName": "Guest",
      "provider": "",
      "extUserId": "",
      "email": "",
      "registered": false,
      "role": "guest",
      "createdAt": new Date(),
      "lastLoginAt": new Date()
    };
  }
  let userId = ctx.meta.user.id;
  let user = await ctx.call('userStore.get', {id: userId});
  return user;
}
