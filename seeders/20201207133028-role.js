"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Roles", [
      { id: 1, name: "user", createdAt: new Date(), updatedAt: new Date() },
      {
        id: 2,
        name: "moderator",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { id: 3, name: "admin", createdAt: new Date(), updatedAt: new Date() },
    ]);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    queryInterface.bulkDelete("Roles", null, {});
  },
};
