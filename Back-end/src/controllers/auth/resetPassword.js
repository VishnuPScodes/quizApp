import { UserAuthServices_ } from "../../services/auth/userAuth.service.js";

export const resetPassword = async (req, res, next) => {
  try {
    const { email, password, token } = req.body;
    const response = await UserAuthServices_.resetPassword({
      email,
      password,
      token,
    });
    res.send(response);
  } catch (error) {
    next(error);
  }
};
