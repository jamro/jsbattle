const { ValidationError } = require("moleculer").Errors;

function validateDisplayName(displayName) {
  if(!displayName) {
    throw new ValidationError('displayName parameter is required', 400);
  }
  if(displayName.length < 3) {
    throw new ValidationError('displayName must be at least 3 characters long', 400);
  }
  if(!(/^[A-Za-z0-9_. -]+$/).test(displayName)) {
    throw new ValidationError('displayName contains invalid characters', 400);
  }
}

function validateUserName(username) {
  if(!username) {
    throw new ValidationError('username parameter is required', 400);
  }
  if(username.length < 3) {
    throw new ValidationError('username must be at least 3 characters long', 400);
  }
  if(!(/^[A-Za-z0-9_.-]+$/).test(username)) {
    throw new ValidationError('username contains invalid characters', 400);
  }
  const reservedNames = [
    'jsbattle',
    'sandbox',
    'user',
    'admin'
  ];
  const isNameReserved = reservedNames.indexOf(username.toLowerCase()) != -1;
  if(isNameReserved) {
    throw new ValidationError(`username must be unique! Chose a different one.`, 400);
  }
}


module.exports = async function(ctx) {
  let response;
  const userId = ctx.meta.user ? ctx.meta.user.id : null;
  if(!userId) {
    throw new ValidationError('Not Authorized!', 401);
  }
  let username = ctx.params.username ? ctx.params.username.toLowerCase() : '';
  let displayName = ctx.params.displayName || '';

  // check if init data already sent
  this.logger.debug(`Check whether user 'ID:${userId}' was initialized before`);
  response = await ctx.call('userStore.get', { id: userId });
  if(!response) {
    throw new ValidationError('user not found', 401);
  }
  if(response.registered) {
    throw new ValidationError('user already initialized', 400);
  }

  username = username || response.username;
  displayName = displayName || response.displayName;

  validateUserName(username)
  validateDisplayName(displayName)

  // check if username is unique
  this.logger.debug(`Check whether username '${username}' is used`);
  response = await ctx.call('userStore.find', {query: {
    username: username,
    registered: true
  }});

  if(response.length) {
    throw new ValidationError('username must be unique. Chose a different one.', 400);
  }

  this.logger.debug(`Update user ${userId}`);
  response = await ctx.call('userStore.update', {
    id: userId,
    username: username,
    displayName: displayName,
    registered: true
  });
  if(ctx.meta.user) {
    ctx.meta.user.username = username; // eslint-disable-line require-atomic-updates
  }

  let initCalls = [];
  let initChallenges = ctx.params.challenges || [];
  let initScripts = ctx.params.scripts || [];
  for(let challenge of initChallenges) {
    initCalls.push(ctx.call('challenges.updateUserChallenge', challenge));
  }
  for(let script of initScripts) {
    initCalls.push(ctx.call('scriptStore.createUserScript', script));
  }
  await Promise.all(initCalls);

  return ctx.call('auth.whoami', {});
}
