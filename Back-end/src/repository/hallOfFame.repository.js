import userModel from '../models/user.model.js';

export class HallOfFameRepository {
  constructor() {
    this._model = userModel;
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
    const score = await this._model.findOne({ userId }).select('score');

    return score;
  }

  async updateUserScore(userId, score, time, totalgamesplayed) {
    const user = await this._model.findOneAndUpdate(
      { userId, score, bestTime: time, totalgamesplayed },
      { new: true }
    );
    console.log({ user });
    return user;
  }
}
