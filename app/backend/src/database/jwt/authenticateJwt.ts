import { Secret, verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export default function authenticateJwt(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const secret = process.env.JWT_SECRET;
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const decode = verify(authorization, secret as Secret);

  if (!decode) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  next();
}
