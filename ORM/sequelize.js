const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("bazeAPIdb", "fusion", "fusion", {
  dialect: "postgres",
  host: "localhost",
  port: "5432",
});
