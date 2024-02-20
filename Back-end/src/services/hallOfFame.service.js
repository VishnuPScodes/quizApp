import { BadRequestError } from '../../utils/response/error.js';
import { HallOfFameRepository } from '../repository/hallOfFame.repository.js';

class HallOfFameServices {
  constructor() {
    this._hallOfFameServices = new HallOfFameRepository();
  }

  async getUsersSortedByScore() {
    const users = await this._hallOfFameServices.getAllUsersWithSort();
    if (!users) {
      throw new BadRequestError('Users not found!');
    }

    return users;
  }

  async updateUserScore() {
    const { userId } = req.params;
    const { userScore } = Number(req.body);
    const user = await this._hallOfFameServices.getUserScoreByUserId(userId);

    if (!userPreviousScore) {
      throw new BadRequestError('Could not fetch the user!');
    }
    const userPreviousScore = user.score;
    if (userPreviousScore > userScore) {
      return [];
    }
    const updatedUser = await this._hallOfFameServices.updateUserScore(
      userId,
      userScore
    );
    if (!updatedUser) {
      throw new BadRequestError('Could not update the user score');
    }

    return updatedUser;
  }
}

export const HallOfFameServices_ = new HallOfFameServices();
