import { NextFunction, Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

async function orderTeamsPerPointsVictoriesAndGoals(teamsArray: any) {
  const orderedTeamsTotalMatches = await teamsArray
    .sort((a: any, b: any) => {
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

  return orderedTeamsTotalMatches;
}

export default class LeaderboardController {
  static async getLeaderboardForHomeTeam(req: Request, res: Response, _next: NextFunction) {
    const { status, allTeamsTotalMatches } = await LeaderboardService.getLeaderboardForHomeTeam();

    const orderedTeamsTotalMatches = await
    orderTeamsPerPointsVictoriesAndGoals(allTeamsTotalMatches);

    return res.status(status).json(orderedTeamsTotalMatches);
  }

  static async getLeaderboardForAwayTeam(req: Request, res: Response, _next: NextFunction) {
    const { status, allTeamsTotalMatches } = await LeaderboardService.getLeaderboardForAwayTeam();

    const orderedTeamsTotalMatches = await
    orderTeamsPerPointsVictoriesAndGoals(allTeamsTotalMatches);

    return res.status(status).json(orderedTeamsTotalMatches);
  }
}
