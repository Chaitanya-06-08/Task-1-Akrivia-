/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.hasTable("users").then((exists) => {
    if (exists) {
      return knex.schema.hasColumn("users", "refresh_token").then((exists) => {
        if (!exists) {
          return knex.schema.table("users", (table) => {
            table.text("refresh_token").nullable();
          });
        }
      });
    }
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.table("users", (table) => {
    table.dropColumn("refresh_token");
  });
};
