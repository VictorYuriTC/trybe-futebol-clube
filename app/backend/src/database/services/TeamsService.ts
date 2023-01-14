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

  static async getTeamLossesDrawsAndVictoriesById(id: number, teamType: string) {
    let totalVictories = 0;
    let totalDraws = 0;
    let totalLosses = 0;
    const { allFinishedMatchesAtHome } = await this.getTeamFinishedMatchesAtHomeById(id, teamType);

    allFinishedMatchesAtHome
      .forEach((match) => {
        if (match.homeTeamGoals < match.awayTeamGoals) totalLosses += 1;
        if (match.homeTeamGoals === match.awayTeamGoals) {
          totalDraws += 1;
        }

        if (match.homeTeamGoals > match.awayTeamGoals) {
          totalVictories += 1;
        }
      });

    return { totalVictories, totalDraws, totalLosses };
  }

  static async getTeamTotalPointsById(id: number, teamType: string) {
    let totalPoints = 0;
    const { allFinishedMatchesAtHome } = await this.getTeamFinishedMatchesAtHomeById(id, teamType);

    allFinishedMatchesAtHome
      .forEach((match) => {
        if (match.homeTeamGoals === match.awayTeamGoals) {
          totalPoints += 1;
        }

        if (match.homeTeamGoals > match.awayTeamGoals) {
          totalPoints += 3;
        }
      });

    return { totalPoints };
  }

  static async getTeamGoalsFavorOwnAndBalanceById(id: number, teamType: string) {
    let goalsOwn = 0;
    let goalsFavor = 0;
    const { allFinishedMatchesAtHome } = await this.getTeamFinishedMatchesAtHomeById(id, teamType);

    allFinishedMatchesAtHome
      .forEach((match) => {
        goalsFavor += match.homeTeamGoals;
        goalsOwn += match.awayTeamGoals;
      });

    const goalsBalance = goalsFavor - goalsOwn;

    return { goalsFavor, goalsOwn, goalsBalance };
  }
}
