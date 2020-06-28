const { ValidationError } = require("moleculer").Errors;

module.exports = async function(ctx) {
  let ubd = ctx.params.ubd;

  let validation = await ctx.call('ubdValidator.validate', {ubd});
  if(!validation.valid) {
    throw new ValidationError('ubd parameter is invalid. ' + validation.error, 400);
  }
  this.logger.debug(`Storing UBD since ${ctx.params.createdAt.toISOString()} till ${ctx.params.expiresAt.toISOString()}`);

  if(ctx.params.expiresAt.getTime() < ctx.params.createdAt.getTime()) {
    this.logger.warn('Expire date is in the past. Skipping UBD creation. Nothing will happen.')
    return {};
  }

  this.logger.info(`Publishing UBD`);
  let response = await this._create(ctx, ctx.params);

  return response;
}
