import express from 'express';
import {
  getUsersSortedByScore,
  updateUserScore,
} from '../controllers/hallOfFame.controller.js';
import asyncHandler from '../utils/asyncHandler.js';

const hallOfFameRouter = express.Router();

hallOfFameRouter.get('/', asyncHandler(getUsersSortedByScore));
hallOfFameRouter.patch('/update/:userId', asyncHandler(updateUserScore));

export default hallOfFameRouter;
