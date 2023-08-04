const mysql = require("mysql");

const connection = mysql.createConnection({
  host: " db4free.net",
  port: "3306",
  user: "tmysqlservice",
  password: "tmysqlservice",
  database: "tmysql_service",
});

connection.connect(function (error) {
  if (error) {
    throw error;
  } else {
    console.log("MySQL Database is connected Successfully");
  }
});

module.exports = connection;
