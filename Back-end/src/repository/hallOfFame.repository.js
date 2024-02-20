import User from '../../models/user.model.js';

export class HallOfFameRepository {
  constructor() {
    this._model = User;
  }

  async getAllUsersWithSort() {
    const users = this._model.aggregate([
      {
        $match: {
          score: { $ne: 0 },
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
