import { HallOfFameServices_ } from '../services/hallOfFame.service.js';

export const getUsersSortedByScore = async (req, res) => {
  const users = await HallOfFameServices_.getUsersSortedByScore();

  res.send(users);
};

export const updateUserScore = async (req, res) => {
  const { userId } = req.params;
  const userScore = Number(req.body.userScore);

  const updateUser = await HallOfFameServices_.updateUserScore(
    userId,
    userScore
  );

  res.send(updateUser);
};
