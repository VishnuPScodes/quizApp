import express from 'express';
import {
  getUsersSortedByScore,
  updateUserScore,
} from '../controllers/hallOfFame.controller.js';
import asyncHandler from '../utils/asyncHandler.js';
import { isAuthenticated } from '../middlewares/auth/authenticate.js';

const hallOfFameRouter = express.Router();

hallOfFameRouter.get('/', isAuthenticated, asyncHandler(getUsersSortedByScore));
hallOfFameRouter.patch(
  '/update/:userId',
  isAuthenticated,
  asyncHandler(updateUserScore)
);

export default hallOfFameRouter;
