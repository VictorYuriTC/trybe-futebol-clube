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

  static async getTeamFinishedMatchesAtHomeById(id: number) {
    const allFinishedMatchesAtHome = await Matches
      .findAll({ where: {
        [Op.or]: [
          { homeTeam: id },
        ],

        [Op.and]: [
          { inProgress: 0 },
        ],
      } });

    return { status: 200, allFinishedMatchesAtHome };
  }

  static async getTeamTotalMatchesById(id: number) {
    const { allFinishedMatchesAtHome } = await this.getTeamFinishedMatchesAtHomeById(id);

    const totalGames = allFinishedMatchesAtHome.length;

    return { totalGames };
  }

  static async getTeamLossesDrawsAndVictoriesById(id: number) {
    let totalVictories = 0;
    let totalDraws = 0;
    let totalLosses = 0;
    let totalPoints = 0;
    const { allFinishedMatchesAtHome } = await this.getTeamFinishedMatchesAtHomeById(id);

    allFinishedMatchesAtHome
      .forEach((match) => {
        if (match.homeTeamGoals < match.awayTeamGoals) totalLosses += 1;
        if (match.homeTeamGoals === match.awayTeamGoals) {
          totalDraws += 1;
          totalPoints += 1;
        }

        if (match.homeTeamGoals === match.awayTeamGoals) {
          totalVictories += 1;
          totalPoints += 3;
        }
      });

    return { totalVictories, totalLosses, totalDraws, totalPoints };
  }

  static async getTeamGoalsFavorOwnAndBalanceById(id: number) {
    let goalsOwn = 0;
    let goalsFavor = 0;
    const { allFinishedMatchesAtHome } = await this.getTeamFinishedMatchesAtHomeById(id);

    allFinishedMatchesAtHome
      .forEach((match) => {
        goalsFavor += match.homeTeamGoals;
        goalsOwn += match.awayTeamGoals;
      });

    const goalsBalance = goalsFavor - goalsOwn;

    return { goalsBalance, goalsFavor, goalsOwn };
  }
}
