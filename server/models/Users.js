const db = require("../db/mysqlConnect");
module.exports = class User {
  constructor(email, password) {
    (this.email = email), (this.password = password);
  }
  async addUser() {
    try {
      const email = this.email,
        password = this.password;
      const result = await db.execute(
        "INSERT INTO users (email,password) VALUES(?,?)",
        [email, password]
      );
      console.log(result);
      console.log("insertion success");
    } catch (error) {
      throw new Error(error);
    }
  }
  static async getUser(email) {
    try {
      const result = await db.execute("SELECT * FROM users WHERE email=?", [
        email,
      ]);
      return result[0][0];
    } catch (error) {
      throw new Error(error);
    }
  }
  static async clearRefreshToken(email) {
    try {
      const result = await db.execute(
        "UPDATE users SET refresh_token=? WHERE email=?",
        [null, email]
      );
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
};
