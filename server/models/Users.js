const db = require("../db/mysqlConnect");
module.exports = class User {
  constructor(email, password) {
    (this.email = email), (this.password = password);
  }
  async addUser() {
    try {
      const email = this.email,
        password = this.password;
      const result = await db.execute("INSERT INTO users VALUES(?,?)", [
        email,
        password,
      ]);
      console.log(result);
      console.log("insertion success");
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Server error in adding user" });
    }
  }
  static async getUser(email, password) {
    try {
      const result = await db.execute(
        "SELECT * FROM users WHERE email=? AND password=?",
        [email, password]
      );
      console.log("fetched user successfully");
      return result;
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Server error in getting user" });
    }
  }
};
