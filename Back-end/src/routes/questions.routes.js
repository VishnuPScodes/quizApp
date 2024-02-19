import express from 'express';
import asyncHandler from '../../utils/asyncHandler.js';
import {
  getAllQuestions,
  getQuestionById,
  getUserQuestions,
  postQuestionForOneUserByAdmin,
  removeAllQuestionsPerUser,
  userResponseEvaluation,
} from '../controllers/questionToUser.controller';

const questionRouter = express.Router();

questionRouter.get('/questions', asyncHandler(getAllQuestions));
questionRouter.get('/question/:questionId', asyncHandler(getQuestionById));
questionRouter.get('/userQuestions', asyncHandler(getUserQuestions));
questionRouter.post('/nextQuestion', asyncHandler(userResponseEvaluation));
questionRouter.post(
  '/postQuestion/:userId',
  asyncHandler(postQuestionForOneUserByAdmin)
);
questionRouter.delete(
  '/removeAllQuestions',
  asyncHandler(removeAllQuestionsPerUser)
);

export default questionRouter;
