"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "matches",

      {
        id: {
          primaryKey: true,
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
        },

        home_team: {
          type: Sequelize.INTEGER,
          references: {
            key: 'id',
            model: 'teams'
          },
          allowNull: false
        },

        home_team_goals: {
          type: Sequelize.INTEGER,
        },

        away_team: {
          type: Sequelize.INTEGER,
          references: {
            key: 'id',
            model: 'teams'
          },
          allowNull: false
        },

        away_team_goals: {
          type: Sequelize.INTEGER,
        },

        in_progress: {
          type: Sequelize.BOOLEAN,
        },
      },

      {
        underscored: true,
        timestamps: false,
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("matches");
  },
};
