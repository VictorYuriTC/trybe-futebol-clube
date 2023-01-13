import { Request, Response, NextFunction } from 'express';
import TeamsService from '../services/TeamsService';

class MatchesValidation {
  static validateTeamsAreDifferent = async (req: Request, res: Response, next: NextFunction) => {
    const { homeTeam, awayTeam } = req.body;

    if (homeTeam === awayTeam) {
      return res.status(422).json(
        {
          message: 'It is not possible to create a match with two equal teams',
        },
      );
    }

    next();
  };

  static async validateTeamsExistOnDB(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { homeTeam, awayTeam } = req.body;
    const homeTeamData = await TeamsService.getTeamById(homeTeam);
    const awayTeamData = await TeamsService.getTeamById(awayTeam);

    if (!homeTeamData.foundTeam
      || !awayTeamData.foundTeam) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }

    next();
  }
}

export default MatchesValidation;
