const HttpError = require('./HttpError.js');
// The request was valid, but the server is refusing action.
// The user might not have the necessary permissions for a
// resource, or may need an account of some sort.

module.exports = class ForbiddenError extends HttpError {

  constructor(msg, orig) {
    super(msg, 403, orig);
  }

};
