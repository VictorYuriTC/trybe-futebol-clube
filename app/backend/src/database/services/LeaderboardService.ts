import TeamsService from './TeamsService';

export default class LeaderboardService {
  static async getLeaderboard() {
    const { allTeams } = await TeamsService
      .getAllTeams();

    const allTeamsTotalMatchesPromise = allTeams.map(async (team) => {
      const { totalGames } = await TeamsService.getTeamTotalMatchesById(team.id);
      const {
        totalVictories,
        totalDraws,
        totalLosses,
      } = await TeamsService.getTeamLossesDrawsAndVictoriesById(team.id);
      return {
        id: team.id, name: team.teamName, totalGames, totalVictories, totalDraws, totalLosses };
    });

    const allTeamsTotalMatches = await Promise.all(allTeamsTotalMatchesPromise);

    return { status: 200, message: 'Leaderboard successfully found', allTeamsTotalMatches };
  }
}
