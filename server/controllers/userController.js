const User = require("../models/Users");
module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  try {
    const result = await User.getUser(email, password);
    if (result) return res.json({ msg: "Logged in successfully" });
    else {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error in logging in" });
  }
};

module.exports.signup = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  try {
    const user = new User(email, password);
    await user.addUser();
    return res.json({ msg: "User added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error in adding user" });
  }
};
