const { Model } = require("objection");
const FilesModel = require("../../db/models/Files");
class User extends Model {
  static get tableName() {
    return "users";
  }
  static get idColumn() {
    return "id";
  }
  static get relationMappings() {
    return {
      files: {
        relation: Model.HasManyRelation,
        modelClass: FilesModel,
        join: {
          from: "users.id",
          to: "files.user_id",
        },
      },
    };
  }
}
module.exports = User;
