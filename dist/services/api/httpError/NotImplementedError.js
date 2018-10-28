const HttpError = require('./HttpError.js');
// The server either does not recognize the request method, or it lacks
// the ability to fulfil the request. Usually this implies future availability
// (e.g., a new feature of a web-service API)

module.exports = class NotImplementedError extends HttpError {

  constructor(msg, orig) {
    super(msg, 501, orig);
  }

};
