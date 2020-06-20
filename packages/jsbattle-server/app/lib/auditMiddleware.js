const moleculer = {
  name: "audit",

  localAction: function (next) {
    return function(ctx) {
      if(!ctx.meta || !ctx.meta.user) {
        return next(ctx);
      }
      if(!ctx.meta.stackLevel) {
        ctx.meta.stackLevel = 0;
      }
      ctx.meta.stackLevel++;
      if(ctx.meta.stackLevel == 1) {
        ctx.broker.emit('user.activity', {
          action: ctx.action.name,
          userId: ctx.meta.user.id,
          username: ctx.meta.user.username,
          role: ctx.meta.user.role,
          timestamp: new Date(),
          stackLevel: ctx.meta.stackLevel,
          uri: ctx.meta.uri
        });
      }
      return next(ctx);
    }
  }
};

const express = (ctx, route, req) => {
  ctx.meta.uri = req.originalUrl;
}

module.exports = {
  moleculer,
  express
}
