module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "Users",
      [
        {
          fullName: "Jane Doe",
          email: "janedoe@example.com",
          password: "123654",
          dob: "12.01.1991",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullName: "Jon Doe",
          email: "jondoe@example.com",
          password: "123654",
          dob: "28.11.1991",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("Users", null, {}),
};
