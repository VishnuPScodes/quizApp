import { UserAuthRepository } from '../../repository/auth/auth.repository.js';
import { newToken } from '../../utils/token.js';

class UserAuthServices {
  constructor() {
    this._userAuthRepository = new UserAuthRepository();
  }

  async getUserData(userId) {
    const user = await this._userAuthRepository.getUserData(userId);
    if (!user) {
      throw new Error('User not found!');
    }

    return user;
  }

  async registerUser(params) {
    const { password, name, email } = params;
    const alreadyUser = await this._userAuthRepository.isUserAlreadyExists(
      email
    );
    console.log('already', alreadyUser);
    if (alreadyUser) {
      throw new Error('Bad Request Error ,user exists');
    }
    const user = this._userAuthRepository.registerUser({
      password,
      name,
      email,
    });
    if (!user) {
      throw new Error('Not able to create the user');
    }

    return user;
  }

  async userLogin(params) {
    const { password, email } = params;
    const alreadyUser = await this._userAuthRepository.isUserAlreadyExists(
      email
    );

    if (!alreadyUser) {
      throw new Error('Bad Request Error ,user does not exists');
    }
    const match = alreadyUser.checkPassword(password);
    if (!match) {
      throw new Error('Password does not match');
    }
    const token = newToken();

    return token;
  }
}

export const UserAuthServices_ = new UserAuthServices();
