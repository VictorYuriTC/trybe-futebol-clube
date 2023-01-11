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

        homeTeam: {
          type: Sequelize.INTEGER,
        },

        homeTeamGoals: {
          type: Sequelize.INTEGER,
        },

        awayTeam: {
          type: Sequelize.INTEGER,
        },

        awayTeamGoals: {
          type: Sequelize.INTEGER,
        },

        inProgress: {
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
