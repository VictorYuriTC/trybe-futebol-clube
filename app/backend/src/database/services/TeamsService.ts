import Teams from '../models/Teams';

export default class TeamsService {
  static async getAllTeams() {
    const allTeams = await Teams.findAll();
    return { status: 200, allTeams, message: 'All teams successfully found' };
  }

  static async getTeamById(id: number) {
    const foundTeam = await Teams.findOne({ where: { id } });
    return { status: 200, foundTeam, message: 'Team successfully found' };
  }
}
