class BadRequestError extends Error {
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

class InternalError extends Error {
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, InternalError.prototype);
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}

class UnprocessableError extends Error {
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, UnprocessableError.prototype);
  }
}

class TooManyRequestsError extends Error {
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, TooManyRequestsError.prototype);
  }
}

class ErrorButOk extends Error {
  // for handling razorpay non 2xx errors
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, ErrorButOk.prototype);
  }
}

class PaymentRequiredError extends Error {
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, PaymentRequiredError.prototype);
  }
}

export {
  BadRequestError,
  InternalError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  UnprocessableError,
  TooManyRequestsError,
  ErrorButOk,
  PaymentRequiredError,
};
