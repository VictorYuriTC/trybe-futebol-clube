import ILogin from '../interfaces/ILogin';
import Users from '../models/Users';

export default class LoginService {
  static async login({ password, username }: ILogin) {
    const loggedUser = Users
      .findOne(
        {
          where:
          {
            username,
            password,
          },
        },
      );
    const isThisPasswordCorrect = true;

    if (isThisPasswordCorrect) {
      return { loggedUser };
    }
  }
}
