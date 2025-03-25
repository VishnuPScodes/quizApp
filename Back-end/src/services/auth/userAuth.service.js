import { UserAuthRepository } from "../../repository/auth/auth.repository.js";
import { BadRequestError } from "../../utils/response/error.js";
import { newToken } from "../../utils/token.js";

class UserAuthServices {
  constructor() {
    this._userAuthRepository = new UserAuthRepository();
  }

  async getUserData(userId) {
    const user = await this._userAuthRepository.getUserData(userId);
    if (!user) {
      throw new BadRequestError("User not found!");
    }

    return user;
  }

  async registerUser(params) {
    //Apart from registering we will make a refresh token and an access token for the user
    //Refesh token will be stored to db, access token will be stored in the cookies with httponly

    const { password, name, email } = params;
    const alreadyUser = await this._userAuthRepository.isUserAlreadyExists(
      email
    );
    if (alreadyUser) {
      throw new BadRequestError("User already exists!");
    }

    const user = await this._userAuthRepository.registerUser({
      password,
      name,
      email,
    });
    if (!user) {
      throw new BadRequestError("Not able to create the user");
    }
    const tokenData = {
      name,
      email,
    };

    const accessToken = newToken(tokenData, "1h");
    const refreshToken = newToken(tokenData, "30d");

    await this._userAuthRepository.storeRefreshToken(user._id, refreshToken);

    return {
      user,
      accessToken,
    };
  }

  async userLogin(params) {
    const { password, email } = params;
    const alreadyUser = await this._userAuthRepository.isUserAlreadyExists(
      email
    );

    if (!alreadyUser) {
      throw new BadRequestError("User does not exists with this email id");
    }
    const match = alreadyUser.checkPassword(password);

    if (!match) {
      throw new BadRequestError("Password does not match");
    }
    const tokenData = {
      name: alreadyUser.name,
      email: alreadyUser.email,
    };

    const accessToken = newToken(tokenData, "1h");
    const refreshToken = newToken(tokenData, "30d");

    const storedRefreshToken = await this._userAuthRepository.storeRefreshToken(
      alreadyUser._id,
      refreshToken
    );
    if (!storedRefreshToken) {
      throw new BadRequestError("Not able to store the refresh token");
    }

    return { accessToken, user: alreadyUser };
  }

  async sendMailForForgotPassword(email) {
    const user = await this._userAuthRepository.isUserAlreadyExists(email);
    if (!user) {
      throw new BadRequestError("User does not exists with this email id");
    }
    const tokenData = {
      email: user.email,
    };
    const accessToken = newToken(tokenData, "1h");
    const response = await this._userAuthRepository.sendMailForForgotPassword(
      "psvishnu131@gmail.com",
      "Welcome to Our Platform",
      "Thank you for joining!",
      "<h1>Welcome Aboard!</h1><p>We're excited to have you with us.</p>"
    );

    return response;
  }
}

export const UserAuthServices_ = new UserAuthServices();
