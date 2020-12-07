"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          "Users",
          "roleId",
          {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          { transaction: t }
        ),
      ]);
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Users");
  },
};
