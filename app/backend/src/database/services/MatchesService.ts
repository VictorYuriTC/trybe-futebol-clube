import Matches from '../models/Matches';
import Teams from '../models/Teams';

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
}
