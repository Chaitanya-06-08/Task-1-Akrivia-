const { Model } = require("objection");

class People extends Model {
  static get tableName() {
    return "people";
  }
  static get idColumn() {
    return "id";
  }
}
module.exports = People;
