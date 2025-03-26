import { UserAuthServices_ } from "../../services/auth/userAuth.service.js";

export const sendMailForForgotPassword = async (req, res, next) => {
  const { email } = req.body;
  const response = await UserAuthServices_.sendMailForForgotPassword(email);
  res.send({ message: "Mail sent successfully", data: response });
};
