import userModel from '../models/user.model.js';
import mongoose, { ObjectId } from 'mongoose';
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
    const user = await this._model
      .findOne({ _id: userId })
      .select('score bestTime totalgamesplayed');

    return user;
  }

  async updateUserScore(userId, score, time, totalgamesplayed) {
    const updatedUser = await this._model.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(userId) },
      { $set: { score, bestTime: time, totalgamesplayed } },
      { new: true }
    );
    return updatedUser;
  }
}
