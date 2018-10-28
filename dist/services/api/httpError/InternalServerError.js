const HttpError = require('./HttpError.js');
// A generic error message, given when an unexpected condition was
// encountered and no more specific message is suitable.

module.exports = class InternalServerError extends HttpError {

  constructor(msg, orig) {
    super(msg, 500, orig);
  }

};
