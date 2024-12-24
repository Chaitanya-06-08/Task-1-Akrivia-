const User = require("../models/Users");
module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  try {
    const result = await User.getUser(email, password);
    console.log(result);
    return res.json({ msg: "Logged in successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error in logging in" });
  }
  return res.json({
    msg: "Hello from login route",
  });
};
