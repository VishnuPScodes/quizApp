import express from 'express';
//import Reg from '../models/reg.model.js';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { UserAuthServices_ } from '../../services/auth/userAuth.service.js';
const newToken = (regData) => {
  return jwt.sign({ regData }, process.env.JWT_SECRET_KEY);
};

const router = express.Router();

export const getUserInfo = async (req, res) => {
  const userId = req.params.id;
  const user = await UserAuthServices_.getUserData(userId);

  res.send(user);
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await UserAuthServices_.registerUser({ name, email, password });

  res.status(200).send({
    message: 'User registered',
    data: user,
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const loginResponse = await UserAuthServices_.userLogin({ password, email });

  res.send(loginResponse);
};

export default router;
