"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "users",

      {
        id: {
          primaryKey: true,
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
        },

        username: {
          type: Sequelize.STRING,
        },

        role: {
          type: Sequelize.STRING,
        },

        email: {
          type: Sequelize.STRING,
        },

        password: {
          type: Sequelize.STRING,
        },
      },

      {
        underscored: true,
        timestamps: false,
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("users");
  },
};
