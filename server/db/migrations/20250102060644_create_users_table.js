/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  knex.schema.hasTable("users").then((exists) => {
    if (exists) {
      return new Promise((resolve) => resolve());
    }
    return knex.schema.createTable("users", (table) => {
      table.increments("id").primary();
      table.string("email").notNullable().unique();
      table.string("password").notNullable();
      table.timestamps(true, true);
    });
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};