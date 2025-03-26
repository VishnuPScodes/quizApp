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

  async sendMailForForgotPassword(to, resetToken) {
    try {
      const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

      const transporter = createTransporter();

      // Define email options
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: "Password Reset Request",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Password Reset Request</h2>
            <p>You have requested a password reset for your account.</p>
            <p>Click the button below to reset your password:</p>
            <a href="${resetURL}" style="
              display: inline-block;
              padding: 10px 20px;
              background-color: #4CAF50;
              color: white;
              text-decoration: none;
              border-radius: 5px;
            ">Reset Password</a>
            <p>If you did not request a password reset, please ignore this email.</p>
            <p>This link will expire in 1 hour.</p>
          </div>
        `,
        text: `
          Password Reset Request
          
          Click the following link to reset your password:
          ${resetURL}
          
          If you did not request a password reset, please ignore this email.
          
          This link will expire in 1 hour.
        `,
      };
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent successfully:", info.messageId);
      return info;
    } catch (error) {
      console.log("Error while sending email:", error);
      return error;
    }
  }
  async storeResetToken(userId, resetToken, expiresAt) {
    const user = await this._model.findOne({ _id: userId });
    if (!user) {
      return false;
    }
    user.resetToken = resetToken;
    user.resetTokenExpiration = expiresAt;
    const storedResetToken = await user.save();
    return storedResetToken;
  }
  async storeNewPassword(email, password) {
    const user = await this._model.findOne({ email });
    if (!user) {
      return false;
    }
    user.password = password;
    const storedNewPassword = await user.save();
    return storedNewPassword;
  }
}
