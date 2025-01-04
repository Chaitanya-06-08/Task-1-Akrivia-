const UserModel = require("../db/models/Users");
module.exports = class User {
  constructor(email, password) {
    (this.email = email), (this.password = password);
  }
  async addUser() {
    try {
      const email = this.email,
        password = this.password;
      const result = await UserModel.query().insert({ email, password });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  static async getUser(email) {
    try {
      const user = await UserModel.query().where("email", email).first();
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
  static async clearRefreshToken(email) {
    try {
      const result = await UserModel.query()
        .where("email", email)
        .patch({ refresh_token: null });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  static async setRefreshToken(email, refreshToken) {
    try {
      const result = await UserModel.query()
        .where("email", email)
        .patch({ refresh_token: refreshToken });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
};
