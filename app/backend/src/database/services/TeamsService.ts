import { Op } from 'sequelize';
import Matches from '../models/Matches';
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

  static async getTeamFinishedMatchesAtHomeById(id: number, teamType: string) {
    const allFinishedMatchesAtHome = await Matches
      .findAll({ where: {
        [Op.or]: [
          { [`${teamType}Team`]: id },
        ],

        [Op.and]: [
          { inProgress: 0 },
        ],
      } });

    return { status: 200, allFinishedMatchesAtHome };
  }

  static async getTeamTotalMatchesById(id: number, teamType: string) {
    const { allFinishedMatchesAtHome } = await this.getTeamFinishedMatchesAtHomeById(id, teamType);

    const totalGames = allFinishedMatchesAtHome.length;

    return { totalGames };
  }

  static async getTeamEfficiencyById(id: number, teamType: string) {
    const { totalGames } = await this.getTeamTotalMatchesById(id, teamType);
    const { totalPoints } = await this.getTeamTotalPointsById(id, teamType);

    const maxPoints = totalGames * 3;

    const efficiency = ((totalPoints / maxPoints) * 100).toFixed(2);

    return { efficiency };
  }

  static async getTeamNameById(id: number) {
    const teamName = await TeamsService.getTeamById(id);

    return { name: teamName };
  }

  static async getTeamLossesDrawsAndVictoriesById(id: number, teamType: string) {
    let totalVictories = 0;
    let totalDraws = 0;
    let totalLosses = 0;
    const { allFinishedMatchesAtHome } = await this.getTeamFinishedMatchesAtHomeById(id, teamType);
    const comparison = teamType === 'home' ? 'away' : 'home';

    allFinishedMatchesAtHome
      .forEach((match: any) => {
        if (match[`${teamType}TeamGoals`] < match[`${comparison}TeamGoals`]) totalLosses += 1;
        if (match[`${teamType}TeamGoals`] === match[`${comparison}TeamGoals`]) {
          totalDraws += 1;
        }

        if (match[`${teamType}TeamGoals`] > match[`${comparison}TeamGoals`]) {
          totalVictories += 1;
        }
      });

    return { totalVictories, totalDraws, totalLosses };
  }

  static async getTeamTotalPointsById(id: number, teamType: string) {
    let totalPoints = 0;
    const { allFinishedMatchesAtHome } = await this.getTeamFinishedMatchesAtHomeById(id, teamType);
    const comparison = teamType === 'home' ? 'away' : 'home';

    allFinishedMatchesAtHome
      .forEach((match: any) => {
        if (match[`${teamType}TeamGoals`] === match[`${comparison}TeamGoals`]) {
          totalPoints += 1;
        }

        if (match[`${teamType}TeamGoals`] > match[`${comparison}TeamGoals`]) {
          totalPoints += 3;
        }
      });

    return { totalPoints };
  }

  static async getTeamGoalsFavorOwnAndBalanceById(id: number, teamType: string) {
    let goalsOwn = 0;
    let goalsFavor = 0;
    const { allFinishedMatchesAtHome } = await this.getTeamFinishedMatchesAtHomeById(id, teamType);
    const comparison = teamType === 'home' ? 'away' : 'home';
    allFinishedMatchesAtHome
      .forEach((match: any) => {
        goalsFavor += match[`${teamType}TeamGoals`];
        goalsOwn += match[`${comparison}TeamGoals`];
      });

    const goalsBalance = goalsFavor - goalsOwn;

    return { goalsFavor, goalsOwn, goalsBalance };
  }
}
