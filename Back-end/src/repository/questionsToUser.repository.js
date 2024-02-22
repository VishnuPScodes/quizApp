import QuestionModel from '../models/question.model.js';
import LiveQuestionModel from '../models/liveQuestions.model.js';

export class QuestionsToUserRepository {
  constructor() {
    this._model = QuestionModel;
    this._liveQuestionModel = LiveQuestionModel;
  }

  async getAllQuestions() {
    const questions = this._model.find().lean();

    return questions;
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
    const postedQuestion = await QuestionModel.create({
      id,
      question,
      option1,
      option2,
      option3,
      option4,
      answer,
      difficulty,
    });

    return postedQuestion;
  }

  async getUserQuestions(userId) {
    const questions = this._model.find({ userId }).lean();

    return questions;
  }

  async getQuestionById(questionId) {
    const question = this._model.findOne({ _id: questionId });

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
    const questionCreated = await this._liveQuestionModel.create({
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

    return questionCreated;
  }

  async getQuestionWithMoreDifficultyLevel(difficultyLevel, userId) {
    const question = await this._model.findOne({
      userId,
      difficulty: { $gt: Number(difficultyLevel) },
    });

    return question;
  }

  async getQuestionWithLessDifficultyLevel(difficultyLevel) {
    const question = await this._model.findOne({
      difficulty: { $lt: Number(difficultyLevel) },
    });
    console.log({ question });
    return question;
  }

  async getOneLiveQuestion(questionId) {
    const question = await this._model.findOne({ _id: questionId });

    return question;
  }

  async deleteAllQuestionForTheUser(userId) {
    const question = await this._liveQuestionModel.deleteMany({ userId });

    return question;
  }
}
