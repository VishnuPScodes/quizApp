import User from '../../models/user.model.js';

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
}
