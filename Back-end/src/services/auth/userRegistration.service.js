import { UserRegistrationRepository } from '../../repository/auth/registration.repository.js';

class UserAuthServices {
  constructor() {
    this._userRegistrationRepository = new UserRegistrationRepository();
  }

  async getUserData(userId) {
    const user = await this._userRegistrationRepository.getUserData(userId);
    if (!user) {
      throw new Error('User not found!');
    }

    return user;
  }

  async registerUser(params) {
    const { password, name, email } = params;
    const alreadyUser =
      await this._userRegistratonRepository.isUserAlreadyExists(email);

    if (alreadyUser) {
      throw new Error('Bad Request Error ,user exists');
    }
    const user = this._model.create({ password, name, email });
    if (!user) {
      throw new Error('Not able to create the user');
    }

    return user;
  }
}

export const UserAuthServices_ = new UserAuthServices();
