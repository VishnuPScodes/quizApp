import express from 'express';
import {
  getUserInfo,
  loginUser,
  registerUser,
} from '../../controllers/auth/auth.controller.js';
import asyncHandler from '../../utils/asyncHandler.js';
import { loginValidator } from '../../middlewares/validators/auth/login.validators.js';
import { registerValidator } from '../../middlewares/validators/auth/register.validators.js';

const authRouter = express.Router();

authRouter.get('/profile/:id', asyncHandler(getUserInfo));
authRouter.post('/register', registerValidator, asyncHandler(registerUser));
authRouter.post('/login', loginValidator, asyncHandler(loginUser));

export default authRouter;
