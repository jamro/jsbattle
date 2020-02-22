const Service = require("moleculer").Service;
const DbService = require("moleculer-db");
const { ValidationError } = require("moleculer").Errors;
const _ = require('lodash');
const getDbAdapterConfig = require("../lib/getDbAdapterConfig.js");

class UserStoreService extends Service {

  constructor(broker) {
    super(broker);
    let adapterConfig = getDbAdapterConfig(broker.serviceConfig.data, 'userStore')
    this.parseServiceSchema({
      ...adapterConfig,
      name: "userStore",
      mixins: [DbService],
      settings: {
        idField: 'id',
        fields: [
          "id",
          "username",
          "displayName",
          "provider",
          "extUserId",
          "email",
          "registered",
          "role",
          "createdAt",
          "lastLoginAt"
        ],
        entityValidator: {
          extUserId: { type: "string", min: 1, max: 255 },
          username: { type: "string", min: 1, max: 255 },
          displayName: { type: "string", min: 1, max: 255 },
          email: { type: "string", min: 0, max: 255 },
          registered: "boolean",
          provider: { type: "string", min: 1, max: 255 },
          role: { type: "string", min: 1, max: 255 },
          createdAt: "date",
          lastLoginAt: "date"
        }
      },
      dependencies: ['auth'],
      actions: {
        findOrCreate: this.findOrCreate,
        register: this.register
      },
      hooks: {
        before: {
          create: [
            function addDefaults(ctx) {
              ctx.params.registered = false;
              ctx.params.createdAt = new Date();
              ctx.params.lastLoginAt = new Date();
              ctx.params.username = ctx.params.username || ctx.params.email.replace(/@.*$/, '').toLowerCase() || ctx.params.displayName.replace(' ', '').toLowerCase() || 'anonymous';
              ctx.params.displayName = ctx.params.displayName || ctx.params.username || 'Anonymous';
              ctx.params.role = ctx.params.role || 'user';
              ctx.params = _.omit(ctx.params, ['id']);
              return ctx;
            }
          ],
          update: [
            function omitReadOnly(ctx) {
              ctx.params = _.omit(ctx.params, [
'createdAt',
'extUserId',
'provider'
]);
              return ctx;
            }
          ]
        }
      }
    });
  }

  async register(ctx) {
    let response;
    const userId = ctx.meta.user ? ctx.meta.user.id : null;
    let username = ctx.params.username ? ctx.params.username.toLowerCase() : '';
    let displayName = ctx.params.displayName || '';

    // check if init data already sent
    this.logger.debug(`Check whether user 'ID:${userId}' was initialized before`);
    response = await ctx.call('userStore.get', { id: userId });
    if(!response) {
      throw new ValidationError('user not found (2)', 401);
    }
    if(response.registered) {
      throw new ValidationError('user already initialized', 400);
    }

    username = username || response.username;
    displayName = displayName || response.displayName;

    if(!userId) {
      throw new ValidationError('user not found (1)', 401);
    }
    if(!username) {
      throw new ValidationError('username parameter is required', 400);
    }
    if(!displayName) {
      throw new ValidationError('displayName parameter is required', 400);
    }
    if(username.length < 3) {
      throw new ValidationError('username must be at least 3 characters long', 400);
    }
    if(displayName.length < 3) {
      throw new ValidationError('displayName must be at least 3 characters long', 400);
    }
    if(!(/^[A-Za-z0-9_.-]+$/).test(username)) {
      throw new ValidationError('username contains invalid characters', 400);
    }
    if(!(/^[A-Za-z0-9_. -]+$/).test(displayName)) {
      throw new ValidationError('displayName contains invalid characters', 400);
    }

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
    return ctx.call('auth.whoami', {});
  }

  async findOrCreate(ctx) {
    let user = ctx.params.user;
    if(!user) {
      throw new ValidationError('user parameter is required', 400);
    }
    if(!user.extUserId) {
      throw new ValidationError('user.extUserId parameter is required', 400);
    }
    if(!user.username && !user.email && !user.displayName) {
      throw new ValidationError('user.usernamem, user.email or user.displayName parameter is required', 400);
    }
    if(!user.provider) {
      throw new ValidationError('user.provider parameter is required', 400);
    }

    let response;
    response = await ctx.call('userStore.find', {query: {
      extUserId: user.extUserId
    }});

    if(response.length > 0) {
      return response[0];
    }
    let admins = ctx.broker.serviceConfig.auth.admins;
    let role = 'user';
    admins = admins.find((admin) => admin.provider == user.provider && admin.username == user.username);

    if(admins) {
      role = 'admin';
    }
    let userModel = {
      extUserId: user.extUserId,
      username: user.username,
      provider: user.provider,
      email: user.email || '',
      displayName: user.displayName || user.username,
      createdAt: new Date(),
      role: role,
      lastLoginAt: new Date()
    }
    response = await ctx.call('userStore.create', userModel);
    return response;
  }
}

module.exports = UserStoreService;
