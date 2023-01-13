import Matches from '../models/Matches';
import Teams from '../models/Teams';

export default class MatchesService {
  static async getAllMatches() {
    const allMatches = await Matches
      .findAll({ include: [{ model: Teams, as: 'teamHome' }, { model: Teams, as: 'teamAway' }] });
    return { status: 200, allMatches, message: 'All matches found successfully' };
  }
}
