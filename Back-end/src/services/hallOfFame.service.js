import { HallOfFameRepository } from '../repository/hallOfFame.repository.js';
import { BadRequestError } from '../utils/response/error.js';

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

  async updateUserScore(userId, userScore, time) {
    const user = await this._hallOfFameServices.getUserScoreByUserId(userId);

    if (!user) {
      throw new BadRequestError('Could not fetch the user!');
    }
    const userPreviousScore = user.score;
    const previousBestTime = user.bestTime;
    let totalGamesPlayed = user.totalgamesplayed + 1;
    if (previousBestTime < time) {
      time = previousBestTime;
    }
    if (userPreviousScore > userScore) {
      userScore = userPreviousScore;
    }
    const updatedUser = await this._hallOfFameServices.updateUserScore(
      userId,
      userScore,
      time,
      totalGamesPlayed
    );

    if (!updatedUser) {
      throw new BadRequestError('Could not update the user score');
    }

    return updatedUser;
  }
}

export const HallOfFameServices_ = new HallOfFameServices();
