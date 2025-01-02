const knex = require("knex");
const { Model } = require("objection");
const knexfile = require("./knexfile");
const dbSetup = () => {
  const db = knex(knexfile.development);
  Model.knex(db);
};

module.exports = dbSetup;
