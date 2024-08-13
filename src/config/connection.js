const { Sequelize } = require("sequelize");

const connection = new Sequelize({
  dialect: "mysql",
  database: "projeto-nota",
  host: "localhost",
  username: "root",
  password: "@Manualdomundo02",
  port: 3306,
});

module.exports = connection;
