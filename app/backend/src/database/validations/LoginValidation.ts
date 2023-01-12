import { Request, Response, NextFunction } from 'express';

class LoginValidation {
  static validateAllFieldsAreFilled = async (req: Request, res: Response, next: NextFunction) => {
    const { password, email } = req.body;

    if (!password || !email) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    next();
  };
}

export default LoginValidation;
