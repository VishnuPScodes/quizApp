import { validationResult } from 'express-validator';
import mongoSanitize from 'express-mongo-sanitize';
import asyncHandler from './../../utils/asyncHandler.js';

const validateRequest = [
  mongoSanitize(),
  asyncHandler((req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({
        error: errors.array()[0].msg,
      });
    } else {
      next();
    }
  }),
];

export default validateRequest;
