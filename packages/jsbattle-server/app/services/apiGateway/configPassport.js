const passport = require('passport');

const authStrategies = [];
authStrategies['github'] = require("passport-github2");
authStrategies['facebook'] = require("passport-facebook");
authStrategies['google'] = require("passport-google-oauth");
authStrategies['twitter'] = require("passport-twitter");
authStrategies['linkedin'] = require("passport-linkedin-oauth2");
authStrategies['slack'] = require("passport-slack");

function configPassport(app, logger, broker) {
  app.use(passport.initialize());
  if(broker.serviceConfig.auth.providers.length == 0) {
    logger.warn('Auth enabled but no providers were configured. You won\'t be able to log in or register');
  }
  broker.serviceConfig.auth.providers.forEach((provider) => {
    let AuthStrategy = authStrategies[provider.name];
    if(!AuthStrategy) {
      throw Error(`Strategy ${provider.name} is not supported`);
    }
    passport.use(new AuthStrategy(
      {
        clientID: provider.clientID,
        clientSecret:provider.clientSecret,
        callbackURL: broker.serviceConfig.web.baseUrl + "/auth/" + provider.name + "/callback"
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
      passport.authenticate(provider.name, { failureRedirect: '/' }),
      async (req, res) => {
        let user = await broker.call('userStore.findOrCreate', {user: req.user});
        let response = await broker.call('auth.authorize', { user });
        broker.emit("user.login", user.id);
        res.cookie('JWT_TOKEN', response.token, { httpOnly: true, maxAge: 24*60*60*1000 })
        res.redirect('/');
      }
    );
    logger.info(`Authorization strategy added: Log in at ${broker.serviceConfig.web.baseUrl}/auth/${provider.name}`);
  });

  app.get(
    `/auth/logout`,
    (req, res) => {
      res.cookie('JWT_TOKEN', '', { httpOnly: true, maxAge: 0 })
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
