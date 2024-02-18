import {
  BadRequestError,
  ErrorButOk,
  ForbiddenError,
  InternalError,
  NotFoundError,
  PaymentRequiredError,
  TooManyRequestsError,
  UnauthorizedError,
  UnprocessableError,
} from './response/error.js';

const asyncHandler = (fnc) => (req, res, next) => {
  return Promise.resolve(fnc(req, res, next)).catch((err) => {
    let status = 500;
    let error = err.message;
    if (err instanceof BadRequestError) {
      status = 400;
    } else if (err instanceof NotFoundError) {
      status = 404;
    } else if (err instanceof UnauthorizedError) {
      status = 401;
    } else if (err instanceof ForbiddenError) {
      status = 403;
    } else if (err instanceof UnprocessableError) {
      status = 422;
    } else if (err instanceof InternalError) {
      status = 500;
    } else if (err instanceof TooManyRequestsError) {
      status = 429;
    } else if (err instanceof ErrorButOk) {
      status = 200;
    } else if (err instanceof PaymentRequiredError) {
      status = 402;
    } else {
      error = 'Internal Server Error Occurred';
    }
    return res.status(status).json({
      error: error,
    });
  });
};

export default asyncHandler;
