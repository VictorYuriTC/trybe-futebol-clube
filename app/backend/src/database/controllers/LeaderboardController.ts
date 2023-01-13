import { NextFunction, Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  static async getLeaderboard(
    req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    const {
      status,
      allTeamsTotalMatches,
    } = await LeaderboardService.getLeaderboard();

    return res.status(status).json(allTeamsTotalMatches);
  }
}
