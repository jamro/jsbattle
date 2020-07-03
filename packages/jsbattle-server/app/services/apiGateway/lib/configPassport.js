const passport = require('passport');

const authStrategies = {};
authStrategies['github'] = require("passport-github2");
authStrategies['facebook'] = require("passport-facebook");
authStrategies['google'] = require("passport-google-oauth").OAuth2Strategy;
const CustomStrategy = require("passport-custom");

const mockUserData = {
  extUserId: 'mock_01',
  displayName: 'Mock User',
  username: 'mock',
  provider: 'mock',
  email: 'mock@example.com'
};

function configStrategyMock(app, logger, broker, providerConfig, serviceConfig) {
  passport.use(new CustomStrategy((req, callback) => {
    callback(null, mockUserData);
  }));
  app.get(
'/auth/mock',
    passport.authenticate('custom', { failureRedirect: '/' }),
    async (req, res) => {
      mockUserData.username = req.query.username || 'mock';
      mockUserData.displayName = req.query.displayName || 'Mock User';
      mockUserData.extUserId = req.query.extUserId || 'mock_01';
      logger.debug('Login using ' + providerConfig.name + " integration");
      let user = await broker.call('userStore.findOrCreate', {user: mockUserData});
      let response = await broker.call('auth.authorize', { user });
      broker.emit("user.login", user.id);
      broker.emit("user.activity", {action: '$.login', timestamp: new Date(), userId: user.id, username: user.username, role: user.role, uri: req.originalUrl});
      res.cookie('JWT_TOKEN', response.token, { httpOnly: true, maxAge: 60*60*1000 })
      res.redirect('/');
    }
  );
  logger.info(`Authorization strategy added: Log in at ${serviceConfig.web.baseUrl}/auth/mock`);
}

function configPassport(app, logger, broker, serviceConfig) {
  app.use(passport.initialize());
  if(serviceConfig.auth.providers.length == 0) {
    logger.warn('Auth enabled but no providers were configured. You won\'t be able to log in or register');
  }
  serviceConfig.auth.providers.forEach((provider) => {
    if(provider.name == 'mock') {
      configStrategyMock(app, logger, broker, provider, serviceConfig);
      return;
    }
    let AuthStrategy = authStrategies[provider.name];
    if(!AuthStrategy) {
      throw Error(`Strategy ${provider.name} is not supported`);
    }
    passport.use(new AuthStrategy(
      {
        clientID: provider.clientID,
        clientSecret:provider.clientSecret,
        callbackURL: serviceConfig.web.baseUrl + "/auth/" + provider.name + "/callback"
      },
      (accessToken, refreshToken, profile, done) => {
        let email = '';
        if(profile.emails && profile.emails.length) {
          email = profile.emails[0].value;
        }
        done(null, {
          extUserId: provider.name + "_" + profile.id,
          displayName: profile.displayName,
          username: profile.username,
          provider: provider.name,
          email: email
        });
      }
    ));
    app.get(`/auth/${provider.name}`, passport.authenticate(provider.name, { scope: 'email' }));
    app.get(
      `/auth/${provider.name}/callback`,
      passport.authenticate(provider.name, { failureRedirect: '/admin' }),
      async (req, res) => {
        logger.debug('Login using ' + provider.name + " integration");
        let user = await broker.call('userStore.findOrCreate', {user: req.user});
        let response = await broker.call('auth.authorize', { user });
        broker.emit("user.login", user.id);
        broker.emit("user.activity", {action: '$.login', timestamp: new Date(), userId: user.id, username: user.username, role: user.role, uri: req.originalUrl});
        res.cookie('JWT_TOKEN', response.token, { httpOnly: true, maxAge: 60*60*1000 })
        res.redirect('/');
      }
    );
    logger.info(`Authorization strategy added: Log in at ${serviceConfig.web.baseUrl}/auth/${provider.name}`);
  });

  app.get(
    `/auth/logout`,
    (req, res) => {
      logger.debug('Logout');
      res.cookie('JWT_TOKEN', '', { httpOnly: true, maxAge: 0 })
      req.logout();
      res.redirect('/');
    }
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
}

module.exports = configPassport;
