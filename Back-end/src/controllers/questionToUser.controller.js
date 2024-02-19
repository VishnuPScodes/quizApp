import { QuestionToUserServices_ } from '../services/questionsToUser.service';

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
  const { questionId, answer, userId } = req.body;
  const nextQuestion = await QuestionToUserServices_.userResponseEvaluation({
    questionId,
    answer,
    userId,
  });

  res.send(nextQuestion);
};

export const removeAllQuestionsPerUser = async (req, res) => {
  const userId = req.params.userId;
  const removedQuestions =
    await QuestionToUserServices_.removeAllQuestionForTheUser(userId);

  res.send(removedQuestions);
};
