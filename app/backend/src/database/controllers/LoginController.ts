import { NextFunction, Request, Response } from 'express';
import LoginService from '../services/LoginService';

export default class LoginController {
  static async login(
    req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    const {
      password,
      email,
    } = req.body;

    const { token, status, message } = await LoginService.login({
      password,
      email,
    });

    return res.status(status).json({ token, message });
  }
}
