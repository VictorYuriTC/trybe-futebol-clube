import { compare } from 'bcryptjs';
import ILogin from '../interfaces/ILogin';
import generateJwtToken from '../jwt/generateJwtToken';
import Users from '../models/Users';

export default class LoginService {
  static async getUserByEmail(email: string) {
    const loggedUser = await Users
      .findOne({ where: { email } });
    return loggedUser;
  }

  static async login({ password, email }: ILogin) {
    const loggedUser = await this.getUserByEmail(email);

    if (!loggedUser) {
      return { message: 'Incorrect email or password', status: 401 };
    }

    const isThisPasswordCorrect = await compare(password, loggedUser?.password);

    if (!isThisPasswordCorrect) {
      return { message: 'Incorrect email or password', status: 401 };
    }

    const token = generateJwtToken({ email });
    return { token, status: 200, message: 'User successfully logged' };
  }
}
