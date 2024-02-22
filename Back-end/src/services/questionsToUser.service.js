import { QuestionsToUserRepository } from '../repository/questionsToUser.repository.js';
import { NotFoundError, BadRequestError } from '../utils/response/error.js';
import bcrypt from 'bcryptjs';

class QuestionToUserServices {
  constructor() {
    this._questionToUserRepository = new QuestionsToUserRepository();
  }

  async getAllQuestions() {
    const allQuestions = await this._questionToUserRepository.getAllQuestions();
    if (!allQuestions) {
      throw new NotFoundError('Questions not found!');
    }

    return allQuestions;
  }

  async createQuestion(params) {
    const {
      id,
      question,
      option1,
      option2,
      option3,
      option4,
      answer,
      difficulty,
    } = params;
    const postedQuestion = await this._questionToUserRepository.createQuestion({
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

    return postedQuestion;
  }

  async getUserQuestions(userId) {
    const questions = await this._questionToUserRepository.getUserQuestions(
      userId
    );
    if (questions.length == 0) {
      throw new NotFoundError('No questions available for the user!');
    }

    return questions;
  }

  async getQuestionById(questionId) {
    const question = await this._questionToUserRepository.getQuestionById(
      questionId
    );
    if (!question) {
      throw new BadRequestError('Question not found!');
    }

    return question;
  }

  async postQuestionForOneUserByAdmin(params) {
    const {
      id,
      question,
      option1,
      option2,
      option3,
      option4,
      answer,
      difficulty,
      userId,
    } = params;
    const questionCreated =
      await this._questionToUserRepository.postQuestionForOneUserByAdmin({
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
    if (!questionCreated) {
      throw new BadRequestError('Could not post the question!');
    }

    return questionCreated;
  }

  async userResponseEvaluation(params) {
    const { questionId, answer } = params;
    const question = await this._questionToUserRepository.getQuestionById(
      questionId
    );

    if (!question) {
      throw new BadRequestError('Question not found!');
    }
    const difficultyLevel = question.difficulty;

    const isAnswerCorrect = bcrypt.compareSync(answer, question?.answer);

    if (isAnswerCorrect) {
      const questionWithMoreDifficulty =
        await this._questionToUserRepository.getQuestionWithMoreDifficultyLevel(
          difficultyLevel
        );

      return questionWithMoreDifficulty;
    }

    const questionWithLessDifficulty =
      await this._questionToUserRepository.getQuestionWithLessDifficultyLevel(
        difficultyLevel
      );

    return questionWithLessDifficulty;
  }

  async removeAllQuestionForTheUser(userId) {
    const question =
      await this._questionToUserRepository.deleteAllQuestionForTheUser(userId);
    if (!question) {
      throw new BadRequestError('Could not remove the questions!');
    }

    return question;
  }
}

export const QuestionToUserServices_ = new QuestionToUserServices();
