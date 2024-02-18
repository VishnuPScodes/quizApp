import QuestionModel from '../models/question.model.js';
import LiveQuestionModel from '../models/quest.model.js';

export class QuestionsToUserRepository {
  constructor() {
    this._model = QuestionModel;
    this._liveQuestionModel = LiveQuestionModel;
  }

  async getAllQuestions() {
    const questions = this._model.find().lean();

    return questions;
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
    const question = await this._liveQuestionModel.findOne({
      userId,
      difficulty: { $gt: Number(difficultyLevel) },
    });

    return question;
  }

  async getOneLiveQuestion(questionId) {
    const question = await this._model.findOne({ _id: questionId });

    return question;
  }

  async deleteQuestion(questionId) {
    const question = await this._model.findOneAndDelete({ _id: questionId });

    return question;
  }
}
