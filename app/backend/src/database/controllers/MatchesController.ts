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

  static async getMatchesFilteredByInProgress(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { inProgress } = req.query;

    if (!inProgress) {
      return next();
    }

    const {
      allMatchesInProgress,
      status,
    } = await MatchesService.getMatchesFilteredByInProgress(inProgress as string);

    return res.status(status).json(allMatchesInProgress);
  }

  static async createNewMatchByIMatchPayload(
    req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    const {
      createdMatch,
      status,
    } = await MatchesService.createNewMatchByIMatchPayload(req.body);
    return res.status(status).json(createdMatch);
  }

  static async updateInProgressToFalse(
    req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    const { id } = req.params;
    const {
      status,
      message,
    } = await MatchesService.updateInProgressToFalse(Number(id));
    return res.status(status).json(message);
  }

  static async updateAmountOfGoalsInAMatch(
    req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    const { id } = req.params;
    const {
      status,
      message,
    } = await MatchesService.updateAmountOfGoalsInAMatch({
      id,
      ...req.body,
    });

    return res.status(status).json({ message });
  }
}
