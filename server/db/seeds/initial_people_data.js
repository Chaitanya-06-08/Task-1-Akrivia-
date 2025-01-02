const {
  generateRandomPersonData,
} = require("../../utils/generateRandomPersonData");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("people").del();
  await knex("people").insert(generateRandomPersonData());
};
