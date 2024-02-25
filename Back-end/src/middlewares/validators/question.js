import { check } from 'express-validator';
import validateRequest from './index.js';

export const createQuestionValidator = [
  check('id')
    .notEmpty()
    .withMessage('id should not be empty')
    .isNumeric()
    .withMessage('id should be a number'),
  check('question')
    .notEmpty()
    .withMessage('question cannot be empty')
    .isString()
    .withMessage('question should be a string'),
  check('option1')
    .notEmpty()
    .withMessage("option1 can't be empty")
    .isString()
    .withMessage('option1 should be a string'),
  check('option2')
    .notEmpty()
    .withMessage("option2 can't be empty")
    .isString()
    .withMessage('option2 should be a string'),
  check('option3')
    .notEmpty()
    .withMessage("option3 can't be empty")
    .isString()
    .withMessage('option3 should be a string'),
  check('option4')
    .notEmpty()
    .withMessage("option4 can't be empty")
    .isString()
    .withMessage('option4 should be a string'),
  check('answer')
    .notEmpty()
    .withMessage("answer can't be empty")
    .isString()
    .withMessage('answer should be a string'),
  check('difficulty')
    .notEmpty()
    .withMessage("difficulty can't be empty")
    .isNumeric()
    .withMessage('difficulty should be a number'),
  ...validateRequest,
];
