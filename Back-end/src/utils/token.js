import jwt from "jsonwebtoken";

export const newToken = (user, expiryIn) => {
  return jwt.sign({ user }, process.env.JWT_SECRET_KEY, {
    expiresIn: expiryIn,
  });
};
