class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something happening wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.errors = errors;
      this.data = null;
      this.statusCode = statusCode;
      this.success = false;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = ApiError;
