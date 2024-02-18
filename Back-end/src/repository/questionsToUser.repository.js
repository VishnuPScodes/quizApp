import QuestionModel from '../models/question.model.js';

export class QuestionsToUserRepository {
  constructor() {
    this._model = QuestionModel;
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

  async deleteQuestion(questionId) {
    const question = await this._model.findOneAndDelete({ _id: questionId });

    return question;
  }
}
