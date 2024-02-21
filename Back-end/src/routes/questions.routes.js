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

const questionRouter = express.Router();

questionRouter.get('/questions', asyncHandler(getAllQuestions));
questionRouter.post('/question', asyncHandler(createQuestion));
questionRouter.get('/question/:questionId', asyncHandler(getQuestionById));
questionRouter.get('/userQuestions/:userId', asyncHandler(getUserQuestions));
questionRouter.post('/nextQuestion', asyncHandler(userResponseEvaluation));
questionRouter.post(
  '/postQuestion/:userId',
  asyncHandler(postQuestionForOneUserByAdmin)
);
questionRouter.delete(
  '/removeAllQuestions/:userId',
  asyncHandler(removeAllQuestionsPerUser)
);

export default questionRouter;
