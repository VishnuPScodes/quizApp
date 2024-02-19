import User from '../../models/user.model.js';
import HallOfFameModel from '../models/hallofame.model.js';

export class HallOfFameRepository {
  constructor() {
    this._model = User;
  }

  async getAllUsersWithSort() {
    const users = this._model.aggregate([
      {
        $match: {
          score: { $ne: null },
        },
      },
      {
        $sort: {
          score: -1,
        },
      },
    ]);

    return users;
  }

  async getUserScoreByUserId(userId) {
    const score = this._model.findOne({ userId }).select('score');

    return score;
  }

  async updateUserScore(userId, score) {
    const user = this._model.findOneAndUpdate({ userId }, { score });

    return user;
  }
}
