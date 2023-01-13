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
  try {
    verify(authorization, secret as Secret);
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }

  next();
}
