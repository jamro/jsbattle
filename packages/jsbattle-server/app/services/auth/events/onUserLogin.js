module.exports = async function(userId) {
  await this.broker.call("userStore.update", {id: userId, lastLoginAt: new Date()});
}
