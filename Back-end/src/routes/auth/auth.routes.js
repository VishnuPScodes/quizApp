import express from 'express';
import {
  getUserInfo,
  registerUser,
} from '../../controllers/auth/registration.controller.js';

const authRouter = express.Router();

authRouter.get('/user/:id', getUserInfo);
authRouter.post('/register', registerUser);

export default authRouter;
