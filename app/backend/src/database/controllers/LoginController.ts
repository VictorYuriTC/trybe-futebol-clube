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
      username,
    } = req.body;

    const loggedUser = LoginService.login({
      password,
      username,
    });

    console.log(loggedUser);

    return res.status(201).json({ loggedUser });
  }
}
