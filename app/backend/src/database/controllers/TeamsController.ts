import { NextFunction, Request, Response } from 'express';
import TeamsService from '../services/TeamsService';

export default class TeamsController {
  static async getAllTeams(
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    const { allTeams, status } = await TeamsService.getAllTeams();
    return res.status(status).json(allTeams);
  }

  static async getTeamById(
    req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    const { id } = req.params;
    const { foundTeam, status } = await TeamsService.getTeamById(Number(id));

    return res.status(status).json(foundTeam);
  }
}
