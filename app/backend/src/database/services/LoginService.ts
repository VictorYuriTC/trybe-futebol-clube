import { compare } from 'bcryptjs';
import ILogin from '../interfaces/ILogin';
import generateJwtToken from '../jwt/generateJwtToken';
import Users from '../models/Users';

export default class LoginService {
  static async login({ password, email }: ILogin) {
    const loggedUser = await Users
      .findOne({ where: { email } });

    if (!loggedUser) return { message: 'User doesn\'t exist' };

    const isThisPasswordCorrect = await compare(password, loggedUser?.password);

    if (isThisPasswordCorrect) {
      const token = generateJwtToken({ email });
      return token;
    }
  }
}
