const mysql = require("mysql2/promise");

const conn = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  // waitForConnections: true,
  // connectionLimit: 10,
  // queueLimit: 0,
  // maxIdle: 10,
  // idleTimeout: 60000,
  // enableKeepAlive: true,
  // keepAliveInitialDelay: 0,
  // connectTimeout: 60000,
  // multipleStatements: true,
  // charset: "utf8mb4",  
});

module.exports = conn;
