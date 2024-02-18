import { check } from 'express-validator';
import validateRequest from '../index.js';

const profileValidator = [
  check('password', 'password can not be number or empty')
    .notEmpty()
    .isString(),
];

const emailValidator = [
  check('email', 'email is not valid').notEmpty().bail().isEmail(),
];

export const loginValidator = [
  profileValidator,
  emailValidator,
  ...validateRequest,
];
