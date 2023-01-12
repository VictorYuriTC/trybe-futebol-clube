import Teams from '../models/Teams';

export default class TeamsService {
  static async getAllTeams() {
    const allTeams = await Teams.findAll();
    return { status: 200, allTeams, message: 'All teams successfully found' };
  }
}
