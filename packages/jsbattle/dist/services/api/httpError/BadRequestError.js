const HttpError = require('./HttpError.js');
// The server cannot or will not process the request due to an apparent
// client error (e.g., malformed request syntax, size too large, invalid
// request message framing, or deceptive request routing)

module.exports = class BadRequestError extends HttpError {

  constructor(msg, orig) {
    super(msg, 400, orig);
  }

};
