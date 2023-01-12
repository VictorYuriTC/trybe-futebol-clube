import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Users extends Model {
  declare id: number;
  declare teamName: string;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

Users.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    username: {
      type: STRING,
    },

    role: {
      type: STRING },

    email: {
      type: STRING,
    },

    password: {
      type: STRING,
    },
  },

  {

    underscored: true,
    sequelize: db,
    modelName: 'user',
    timestamps: false,
  },
);

export default Users;
