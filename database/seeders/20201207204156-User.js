module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "Users",
      [
        {
          fullName: "Artem Romanov",
          email: "ArtemRomanov@admin.com",
          password: "ArtemAdmin",
          dob: new Date("1990-03-14"),
          roleId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullName: "Dmitriy Paliy",
          email: "DmitriyPaliy@moderator.com",
          password: "DimkaModerator",
          dob: new Date("1991-01-12"),
          roleId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullName: "Vladimir Paliy",
          email: "VladimirPaliy@user.com",
          password: "VovkaUser",
          dob: new Date("1989-03-24"),
          roleId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),

  down: async (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("Users", null, {}),
};
