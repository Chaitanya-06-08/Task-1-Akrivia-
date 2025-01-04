const { Model } = require("objection");
const FilesModel = require("../models/Files");
const AirlinesModel = require("../models/Airlines");
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
  static get relationMappings() {
    return {
      airlines: {
        relation: Model.HasManyRelation,
        modelClass: AirlinesModel,
        join: {
          from: "users.id",
          to: "airlines.user_id",
        },
      },
    };
  }
}
module.exports = User;
