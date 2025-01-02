/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  knex.schema.hasTable("airlines").then((exists) => {
    if (!exists) {
      return knex.schema.createTable("airlines", (table) => {
        table.uuid("id").primary();
        table.string("airline_name").notNullable();
        table.string("flight_number").notNullable();
        table.string("departure_airport").notNullable();
        table.string("arrival_airport").notNullable();
        table.timestamp("departure_time").notNullable();
        table.timestamp("arrival_time").notNullable();
        table.decimal("ticket_price", 10, 2).notNullable();
        table.string("seat_number").notNullable();
        table.string("passenger_name").notNullable();
        table.string("passenger_email").notNullable();
        table.string("passenger_phone").notNullable();
        table
          .integer("user_id")
          .unsigned()
          .references("id")
          .inTable("users")
          .onDelete("CASCADE");
        table.timestamps(true, true);
      });
    }
    return Promise.resolve();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("airlines");
};
