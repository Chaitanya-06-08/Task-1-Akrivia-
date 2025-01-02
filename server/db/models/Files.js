const { Model } = require("objection");
const UsersModel = require("../../db/models/Users");
class Files extends Model {
  static get tableName() {
    return "files";
  }
  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UsersModel,
        join: {
          from: "files.user_id",
          to: "users.id",
        },
      },
    };
  }
}
module.exports = Files;
