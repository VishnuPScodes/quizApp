import { QuestionToUserServices_ } from '../services/questionsToUser.service.js';
import { BadRequestError } from '../utils/response/error.js';

export const getAllQuestions = async (req, res) => {
  const questions = await QuestionToUserServices_.getAllQuestions();

  res.send(questions);
};

export const getUserQuestions = async (req, res) => {
  const userId = req.params.userId;
  const userQuestions = await QuestionToUserServices_.getUserQuestions(userId);

  res.send(userQuestions);
};

export const getQuestionById = async (req, res) => {
  const questionId = req.params.questionId;
  const question = await QuestionToUserServices_.getQuestionById(questionId);

  res.send(question);
};

export const createQuestion = async (req, res) => {
  console.log('dfd');
  const {
    id,
    question,
    option1,
    option2,
    option3,
    option4,
    answer,
    difficulty,
  } = req.body;
  const postedQuestion = await QuestionToUserServices_.createQuestion({
    id,
    question,
    option1,
    option2,
    option3,
    option4,
    answer,
    difficulty,
  });
  if (!postedQuestion) {
    throw new BadRequestError('Could not post the question');
  }

  res.send(postedQuestion);
};

export const postQuestionForOneUserByAdmin = async (req, res) => {
  const userId = req.params.userI;
  const {
    id,
    question,
    option1,
    option2,
    option3,
    option4,
    answer,
    difficulty,
  } = req.body;
  const postedQuestion =
    await QuestionToUserServices_.postQuestionForOneUserByAdmin({
      id,
      question,
      option1,
      option2,
      option3,
      option4,
      answer,
      difficulty,
      userId,
    });

  res.send(postedQuestion);
};

export const userResponseEvaluation = async (req, res) => {
  const { questionId, answer } = req.body;
  const nextQuestion = await QuestionToUserServices_.userResponseEvaluation({
    questionId,
    answer,
  });

  res.send(nextQuestion);
};

export const removeAllQuestionsPerUser = async (req, res) => {
  const userId = req.params.userId;
  const removedQuestions =
    await QuestionToUserServices_.removeAllQuestionForTheUser(userId);

  res.send(removedQuestions);
};
