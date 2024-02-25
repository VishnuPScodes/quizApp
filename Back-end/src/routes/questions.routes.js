import express from 'express';

import {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  getUserQuestions,
  postQuestionForOneUserByAdmin,
  removeAllQuestionsPerUser,
  userResponseEvaluation,
} from '../controllers/questionToUser.controller.js';
import asyncHandler from '../utils/asyncHandler.js';
import { isAuthenticated } from '../middlewares/auth/authenticate.js';
import { createQuestionValidator } from '../middlewares/validators/question.js';

const questionRouter = express.Router();

questionRouter.get(
  '/questions',
  isAuthenticated,
  asyncHandler(getAllQuestions)
);
questionRouter.post(
  '/question',
  isAuthenticated,
  createQuestionValidator,
  asyncHandler(createQuestion)
);
questionRouter.get(
  '/question/:questionId',
  isAuthenticated,
  asyncHandler(getQuestionById)
);
questionRouter.get(
  '/userQuestions/:userId',
  isAuthenticated,
  asyncHandler(getUserQuestions)
);
questionRouter.post(
  '/nextQuestion',
  isAuthenticated,
  asyncHandler(userResponseEvaluation)
);
questionRouter.post(
  '/postQuestion/:userId',
  isAuthenticated,
  asyncHandler(postQuestionForOneUserByAdmin)
);
questionRouter.delete(
  '/removeAllQuestions/:userId',
  isAuthenticated,
  asyncHandler(removeAllQuestionsPerUser)
);

export default questionRouter;
