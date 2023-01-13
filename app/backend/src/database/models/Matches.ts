import { BOOLEAN, Model, INTEGER } from 'sequelize';
import db from '.';
import Teams from './Teams';

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
      type: INTEGER,
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

Matches.belongsTo(Teams, {
  foreignKey: 'homeTeam',
  targetKey: 'id',
  as: 'teamHome',
});

Matches.belongsTo(Teams, {
  foreignKey: 'awayTeam',
  targetKey: 'id',
  as: 'teamAway',
});

export default Matches;
