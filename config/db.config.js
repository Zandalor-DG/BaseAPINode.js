module.exports = {
  HOST: "localhost",
  USER: "zandalor",
  PASSWORD: "fusion",
  DB: "database_API",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
