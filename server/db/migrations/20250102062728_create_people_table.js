/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  knex.schema.hasTable("people").then((exists) => {
    if (exists) {
      return;
    }
    return knex.schema.createTable("people", (table) => {
      table.uuid("id").primary().defaultTo(knex.fn.uuid());
      table.string("name").notNullable();
      table.string("email").notNullable();
      table.text("street").notNullable();
      table.string("city").notNullable();
      table.string("state").notNullable();
      table.string("zip_code").notNullable();
      table.string("country").notNullable();
      table.string("phone").notNullable();
      table.date("birthdate").notNullable();
      table.timestamps(true, true);
    });
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("people");
};
