import { createTransporter } from "../../../configs/node-mailer.js";
import User from "../../models/user.model.js";
import nodemailer from "nodemailer";

export class UserAuthRepository {
  constructor() {
    this._model = User;
  }

  async getUserData(userId) {
    const user = this._model.findOne({ _id: userId });

    return user;
  }

  async registerUser(params) {
    const { password, name, email } = params;

    const user = this._model.create({ password, name, email });

    return user;
  }

  async isUserAlreadyExists(email) {
    const user = await this._model.findOne({ email });
    if (!user) {
      return false;
    }

    return user;
  }
  async storeRefreshToken(userId, refreshToken) {
    const storeRefreshToken = await this._model.findOneAndUpdate(
      {
        id: userId,
      },
      {
        $push: {
          refreshTokens: {
            token: refreshToken,
          },
        },
      }
    );
    if (!storeRefreshToken) {
      return false;
    }
    // const user = await this._model.findOne({ _id: userId });
    // user.refreshTokens.push({ token: refreshToken });
    // const storedRefreshToken = await user.save();
    // console.log({ storedRefreshToken });

    return true;
  }

  async sendMailForForgotPassword(to, subject, text, html) {
    try {
      const transporter = createTransporter();

      // Define email options
      const mailOptions = {
        from: process.env.EMAIL_USER, // Sender address
        to: to, // Recipient address
        subject: subject, // Subject line
        text: text, // Plain text body
        html: html, // HTML body (optional)
      };
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent successfully:", info.messageId);
      return info;
    } catch (error) {
      console.log("Error while sending email:", error);
      return error;
    }
  }
}
