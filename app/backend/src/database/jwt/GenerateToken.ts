import { sign, Secret, SignOptions } from 'jsonwebtoken';
import ILogin from '../interfaces/ILogin';

const generateNewJWT = (data: ILogin) => {
  const jwtConfig = {
    expiresIn: '15d',
    algorithm: 'HS256',
  };

  const secret = process.env.JWT_SECRET;

  const token = sign(
    { ...data },
    secret as Secret,
    jwtConfig as SignOptions,
  );

  return token;
};

export default generateNewJWT;
