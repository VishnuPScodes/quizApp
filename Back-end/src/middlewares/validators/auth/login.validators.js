import { check } from 'express-validator';
import validateRequest from '../index.js';

export const loginValidator = [
  check('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email'),
  
  check('password')
    .notEmpty()
    .withMessage('Password is required'),

  ...validateRequest
];
