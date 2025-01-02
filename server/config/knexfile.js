const { knexSnakeCaseMappers } = require("objection");
const path = require("path");
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "mysql2",
    connection: {
      host: "localhost",
      database: "test",
      user: "root",
      password: "akv?_1234",
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
