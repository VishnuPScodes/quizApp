import { UserAuthRepository } from '../../repository/auth/auth.repository.js';
import { BadRequestError } from '../../utils/response/error.js';
import { newToken } from '../../utils/token.js';

class UserAuthServices {
  constructor() {
    this._userAuthRepository = new UserAuthRepository();
  }

  async getUserData(userId) {
    const user = await this._userAuthRepository.getUserData(userId);
    if (!user) {
      throw new BadRequestError('User not found!');
    }

    return user;
  }

  async registerUser(params) {
    const { password, name, email } = params;
    const alreadyUser = await this._userAuthRepository.isUserAlreadyExists(
      email
    );
    if (alreadyUser) {
      throw new BadRequestError('User already exists!');
    }
    const user = await this._userAuthRepository.registerUser({
      password,
      name,
      email,
    });
    if (!user) {
      throw new BadRequestError('Not able to create the user');
    }
    const token = newToken();

    return {
      token,
      user,
    };
  }

  async userLogin(params) {
    console.log('login in');
    const { password, email } = params;
    const alreadyUser = await this._userAuthRepository.isUserAlreadyExists(
      email
    );

    if (!alreadyUser) {
      throw new BadRequestError('User does not exists with this email id');
    }
    const match = alreadyUser.checkPassword(password);
    if (!match) {
      throw new BadRequestError('Password does not match');
    }
    const token = newToken();

    return { token, user: alreadyUser };
  }
}

export const UserAuthServices_ = new UserAuthServices();
