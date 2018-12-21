const HttpError = require('./HttpError.js');
// The requested resource could not be found but may
// be available in the future. Subsequent requests by
// the client are permissible.

module.exports = class NotFoundError extends HttpError {

  constructor(msg, orig) {
    super(msg, 404, orig);
  }

};
