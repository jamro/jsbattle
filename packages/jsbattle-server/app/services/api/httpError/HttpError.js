module.exports = class HttpError extends Error {

  constructor(msg, code, orig) {
    super(msg);
    this.origError = orig;
    this.httpStatus = code;
  }

};
