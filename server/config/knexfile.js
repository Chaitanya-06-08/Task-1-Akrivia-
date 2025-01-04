const { knexSnakeCaseMappers } = require("objection");
const path = require("path");
require("dotenv").config({
  path: "../.env",
});
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "mysql2",
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    migrations: {
      directory: path.join(__dirname, "../db/migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "../db/seeds"),
    },
    ...knexSnakeCaseMappers(),
  },
};
