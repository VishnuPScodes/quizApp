import jwt from 'jsonwebtoken';

export const newToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET_KEY);
};
