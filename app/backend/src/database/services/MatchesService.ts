import IMatchPayload from '../interfaces/IMatchPayload';
import Matches from '../models/Matches';
import Teams from '../models/Teams';

interface IUpdateAmountOfGoalsPayload {
  id: number
  homeTeamGoals: number
  awayTeamGoals: number

}

export default class MatchesService {
  static async getAllMatches() {
    const allMatches = await Matches
      .findAll({ include: [{ model: Teams, as: 'teamHome' }, { model: Teams, as: 'teamAway' }] });
    return { status: 200, allMatches, message: 'All matches found successfully' };
  }

  static async getMatchesFilteredByInProgress(inProgressStr: string) {
    const inProgress = inProgressStr === 'true' ? 1 : 0;

    const allMatchesInProgress = await Matches
      .findAll(
        {
          include:
          [
            { model: Teams, as: 'teamHome' },
            { model: Teams, as: 'teamAway' },
          ],

          where: { inProgress },
        },
      );

    return { status: 200, allMatchesInProgress, message: 'Matches successfully found' };
  }

  static async createNewMatchByIMatchPayload(match: IMatchPayload) {
    const createdMatch = await Matches
      .create({ ...match, inProgress: 1 });

    return { status: 201, createdMatch, message: 'Match successfully created' };
  }

  static async updateInProgressToFalse(id: number) {
    await Matches
      .update(
        { inProgress: 0 },
        { where: { id } },
      );

    return { status: 200, message: 'Finished' };
  }

  static async updateAmountOfGoalsInAMatch({
    id,
    homeTeamGoals,
    awayTeamGoals,
  }: IUpdateAmountOfGoalsPayload) {
    await Matches
      .update(
        {
          homeTeamGoals,
          awayTeamGoals,
        },
        { where: { id } },
      );

    return { status: 200, message: 'Match successfully updated' };
  }
}
