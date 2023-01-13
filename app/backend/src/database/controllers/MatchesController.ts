import { NextFunction, Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  static async getAllMatches(
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    const { allMatches, status } = await MatchesService.getAllMatches();

    console.log('allMatches: ', allMatches);

    return res.status(status).json(allMatches);
  }
}
