const mysql = require("mysql2/promise");

const conn = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "test",
  password:"akv?_1234"
});

module.exports = conn;
