import { HallOfFameServices_ } from '../services/hallOfFame.service.js';

export const getUsersSortedByScore = async (req, res) => {
  console.log('====================================');
  console.log('shit');
  console.log('====================================');
  const users = await HallOfFameServices_.getUsersSortedByScore();

  res.send(users);
};

export const updateUserScore = async (req, res) => {
  const { userId } = req.params;
  console.log({ userId });
  const userScore = Number(req.body.userScore);
  const { time } = req.body;
  const updateUser = await HallOfFameServices_.updateUserScore(
    userId,
    userScore,
    time
  );

  res.send(updateUser);
};
