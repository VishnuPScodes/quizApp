import { check } from 'express-validator';
import validateRequest from '../index.js';

const passwordValidator = [
  check('password', 'please give a strong password')
    .notEmpty()
    .withMessage("Password can't be empty")
    .bail()
    .isStrongPassword(),
];

const emailValidator = [
  check('email', 'please give a valid email id ')
    .notEmpty()
    .withMessage('email should not be empty')
    .bail()
    .isEmail(),
];

export const registerValidator = [
  passwordValidator,
  emailValidator,
  ...validateRequest,
];
