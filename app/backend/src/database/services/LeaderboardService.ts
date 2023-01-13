import TeamsService from './TeamsService';

export default class LeaderboardService {
  static async getLeaderboard() {
    const { allTeams } = await TeamsService.getAllTeams();

    const allTeamsTotalMatchesPromise = allTeams.map(async (team) => {
      const totalMatchesData = await TeamsService.getTeamTotalMatchesById(team.id);
      const matchesResultsData = await TeamsService
        .getTeamLossesDrawsAndVictoriesById(team.id);
      const goalsData = await TeamsService
        .getTeamGoalsFavorOwnAndBalanceById(team.id);
      return { id: team.id,
        name: team.teamName,
        ...totalMatchesData,
        ...matchesResultsData,
        ...goalsData,
      };
    });
    const allTeamsTotalMatches = await Promise.all(allTeamsTotalMatchesPromise);
    return { status: 200, message: 'Leaderboard successfully found', allTeamsTotalMatches };
  }
}
