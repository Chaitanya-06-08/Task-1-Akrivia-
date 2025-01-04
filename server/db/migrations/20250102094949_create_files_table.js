/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  knex.schema.hasTable("files").then((exists) => {
    if (!exists) {
      return knex.schema.createTable("files", (table) => {
        table.increments("id").primary();
        table.string("filename").notNullable();
        table.string("s3_key").notNullable();
        table
          .integer("user_id")
          .unsigned()
          .references("id")
          .inTable("users")
          .onDelete("CASCADE");
        table.timestamps(true, true);
      });
    }
    return new Promise((resolve) => resolve());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("files");
};
