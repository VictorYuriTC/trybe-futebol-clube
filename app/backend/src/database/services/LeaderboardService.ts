import TeamsService from './TeamsService';

export default class LeaderboardService {
  static async getLeaderboard() {
    const { allTeams } = await TeamsService
      .getAllTeams();

    const allTeamsTotalMatchesPromise = allTeams.map(async (team) => {
      const { totalGames } = await TeamsService.getTeamTotalMatchesById(team.id);
      return { id: team.id, name: team.teamName, totalGames };
    });

    const allTeamsTotalMatches = await Promise.all(allTeamsTotalMatchesPromise);

    return { status: 200, message: 'Leaderboard successfully found', allTeamsTotalMatches };
  }
}
