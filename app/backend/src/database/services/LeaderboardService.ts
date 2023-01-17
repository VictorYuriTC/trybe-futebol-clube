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

      return {
        name: team.teamName,
        totalPoints,
        ...totalMatchesData,
        ...matchesResultsData,
        ...goalsData,
        ...efficiencyData };
    });
    const allTeamsTotalMatches = await Promise.all(allTeamsTotalMatchesPromise);

    return { status: 200, message: '"Home" leaderboard successfully found', allTeamsTotalMatches };
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
        ...efficiencyData };
    });
    const allTeamsTotalMatches = await Promise.all(allTeamsTotalMatchesPromise);

    return { status: 200, message: '"Away" leaderboard successfully found', allTeamsTotalMatches };
  }

  static async getLeaderboardForAwayAndHome() {
    const homeData = await this.getLeaderboardForHomeTeam();
    const awayData = await this.getLeaderboardForAwayTeam();

    const allTeamsTotalMatchesPromise = homeData.allTeamsTotalMatches.map(async (teamHome) => {
      const teamAway = awayData.allTeamsTotalMatches.find((e) => teamHome.name === e.name) as any;
      return { name: teamHome.name,
        totalPoints: teamHome.totalPoints + teamAway.totalPoints,
        totalGames: teamHome.totalGames + teamAway.totalGames,
        totalVictories: teamHome.totalVictories + teamAway.totalVictories,
        totalLosses: teamHome.totalLosses + teamAway.totalLosses,
        totalDraws: teamHome.totalDraws + teamAway.totalDraws,
        goalsFavor: teamHome.goalsFavor + teamAway.goalsFavor,
        goalsOwn: teamHome.goalsOwn + teamAway.goalsOwn,
        goalsBalance: teamHome.goalsBalance + teamAway.goalsBalance,
        efficiency: (((teamHome.totalPoints + teamAway.totalPoints)
        / ((teamHome.totalGames + teamAway.totalGames) * 3)) * 100).toFixed(2) };
    });

    const allTeamsTotalMatches = await Promise.all(allTeamsTotalMatchesPromise);

    return { status: 200, message: 'Main leaderboard successfully found', allTeamsTotalMatches };
  }
}
