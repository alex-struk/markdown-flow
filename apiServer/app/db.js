const mysql = require("mysql2");
const dbConfig = require("./db.config.js");

var connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  port:3306
});

module.exports = connection;