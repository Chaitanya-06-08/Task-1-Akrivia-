const {generateRandomAirlinesData}=require('../../utils/generateRandomAirlinesData')
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('airlines').del()
  await knex('airlines').insert(generateRandomAirlinesData(10000));
};
