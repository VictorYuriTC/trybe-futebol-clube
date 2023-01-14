import { NextFunction, Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  static async getLeaderboard(req: Request, res: Response, _next: NextFunction) {
    const { status, allTeamsTotalMatches } = await LeaderboardService.getLeaderboard();

    const orderedTeamsTotalMatches = allTeamsTotalMatches
      .sort((a, b) => {
        if (a.totalPoints === b.totalPoints
          && a.goalsBalance === b.goalsBalance
          && a.goalsFavor === b.goalsFavor) {
          return a.goalsOwn - b.goalsOwn;
        }

        if (a.totalPoints === b.totalPoints
          && a.goalsBalance === b.goalsBalance) {
          return b.goalsFavor - a.goalsFavor;
        }

        if (a.totalPoints === b.totalPoints) {
          return b.goalsBalance - a.goalsBalance;
        }

        return b.totalPoints - a.totalPoints;
      });

    return res.status(status).json(orderedTeamsTotalMatches);
  }
}
