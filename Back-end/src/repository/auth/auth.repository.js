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

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: "Reset Your Quiz App Password",
        html: `
          <div style="
            font-family: 'Poppins', Arial, sans-serif;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
          ">
            <div style="
              text-align: center;
              font-weight: 600;
              font-size: 25px;
              padding: 20px 0;
              color: #000;
            ">
              Reset Your Password
            </div>
            
            <div style="
              padding: 20px;
              background-color: cornsilk;
              border-radius: 10px;
              margin: 20px 0;
              border: 1px solid #000;
            ">
              <p style="
                margin: 0;
                font-size: 16px;
                line-height: 24px;
                color: #000;
              ">
                You have requested to reset your password for your Quiz App account.
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${resetURL}" style="
                  display: inline-block;
                  padding: 10px 30px;
                  background-color: cornsilk;
                  color: #000;
                  text-decoration: none;
                  border-radius: 10px;
                  border: 1px solid #000;
                  font-family: 'Poppins', Arial, sans-serif;
                  font-weight: 500;
                  transition: all 0.3s;
                  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
                ">Reset Password</a>
              </div>
              
              <p style="
                margin: 20px 0 0;
                font-size: 14px;
                color: #bb8135;
                text-align: center;
              ">
                This link will expire in 15 minutes.
              </p>
            </div>
            
            <div style="
              text-align: center;
              font-size: 14px;
              color: #666;
              margin-top: 20px;
            ">
              If you did not request a password reset, please ignore this email.
            </div>
          </div>
        `,
        text: `
          Reset Your Quiz App Password
          
          You have requested to reset your password.
          Click the following link to reset your password:
          ${resetURL}
          
          This link will expire in 15 minutes.
          
          If you did not request a password reset, please ignore this email.
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
