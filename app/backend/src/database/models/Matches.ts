import { BOOLEAN, Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Matches extends Model {
  declare id: number;
  declare homeTeam: number;
  declare homeTeamGoals: number;
  declare awayTeam: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Matches.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    homeTeam: {
      type: STRING,
    },

    homeTeamGoals: {
      type: INTEGER,
    },

    awayTeam: {
      type: INTEGER,
    },

    awayTeamGoals: {
      type: INTEGER,
    },

    inProgress: {
      type: BOOLEAN,
    },
  },

  {

    underscored: true,
    sequelize: db,
    modelName: 'matches',
    timestamps: false,
  },
);

export default Matches;
