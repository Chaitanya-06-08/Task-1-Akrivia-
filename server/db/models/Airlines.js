const { Model } = require("objection");
const UserModel = require("../models/Users");
class Airlines extends Model {
  static get tableName() {
    return "airlines";
  }
  static get idColumn() {
    return "id";
  }
  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "airlines.user_id",
          to: "users.id",
        },
      },
    };
  }
}

module.exports = Airlines;