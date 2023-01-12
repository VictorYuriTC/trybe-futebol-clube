import { sign, Secret, SignOptions } from 'jsonwebtoken';
import IJwtPayload from '../interfaces/IJwtPayload';

const generateJwtToken = (data: IJwtPayload) => {
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

export default generateJwtToken;
