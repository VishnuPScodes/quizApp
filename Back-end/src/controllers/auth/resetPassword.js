import { UserAuthServices_ } from "../../services/auth/userAuth.service";

export const resetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const response = await UserAuthServices_.resetPassword(email);
    const resetPasswordUrl = `http://localhost:3000/reset-password/${response.token}`;
    res.send(response);
  } catch (error) {
    next(error);
  }
};
