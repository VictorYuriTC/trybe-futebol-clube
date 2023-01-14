import TeamsService from './TeamsService';

export default class LeaderboardService {
  static async getLeaderboardForHomeTeam() {
    const { allTeams } = await TeamsService.getAllTeams();

    const allTeamsTotalMatchesPromise = allTeams.map(async (team) => {
      const totalMatchesData = await TeamsService.getTeamTotalMatchesById(team.id, 'home');
      const matchesResultsData = await TeamsService
        .getTeamLossesDrawsAndVictoriesById(team.id, 'home');
      const goalsData = await TeamsService.getTeamGoalsFavorOwnAndBalanceById(team.id, 'home');
      const efficiencyData = await TeamsService.getTeamEfficiencyById(team.id, 'home');
      const { totalPoints } = await TeamsService.getTeamTotalPointsById(team.id, 'home');

      return { name: team.teamName,
        totalPoints,
        ...totalMatchesData,
        ...matchesResultsData,
        ...goalsData,
        ...efficiencyData,
      };
    });
    const allTeamsTotalMatches = await Promise.all(allTeamsTotalMatchesPromise);

    return { status: 200, message: 'Leaderboard successfully found', allTeamsTotalMatches };
  }

  static async getLeaderboardForAwayTeam() {
    const { allTeams } = await TeamsService.getAllTeams();

    const allTeamsTotalMatchesPromise = allTeams.map(async (team) => {
      const totalMatchesData = await TeamsService.getTeamTotalMatchesById(team.id, 'away');
      const matchesResultsData = await TeamsService
        .getTeamLossesDrawsAndVictoriesById(team.id, 'away');
      const goalsData = await TeamsService.getTeamGoalsFavorOwnAndBalanceById(team.id, 'away');
      const efficiencyData = await TeamsService.getTeamEfficiencyById(team.id, 'away');
      const { totalPoints } = await TeamsService.getTeamTotalPointsById(team.id, 'away');

      return { name: team.teamName,
        totalPoints,
        ...totalMatchesData,
        ...matchesResultsData,
        ...goalsData,
        ...efficiencyData,
      };
    });
    const allTeamsTotalMatches = await Promise.all(allTeamsTotalMatchesPromise);

    return { status: 200, message: 'Leaderboard successfully found', allTeamsTotalMatches };
  }
}
