import { Secret, verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

class LoginValidation {
  static validateAllFieldsAreFilled = async (req: Request, res: Response, next: NextFunction) => {
    const { password, email } = req.body;

    if (!password || !email) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    next();
  };

  static async validateUserIsAdmin(
    req: Request,
    res: Response,
    _next: NextFunction,
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

    return res.status(200).json({ role: 'admin' });
  }
}

export default LoginValidation;
