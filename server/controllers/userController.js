const User = require("../models/Users");
const bcrypt = require("bcryptjs");

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  try {
    const user = await User.getUser(email);
    if (!user) return res.status(400).json({ msg: "User does not exist" });

    if(bcrypt.compareSync(password, user.password)){
        return res.json({ msg: "User logged in successfully" });
    }
    else{
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
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = new User(email, hashedPassword);
    await user.addUser();
    return res.json({ msg: "User added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error in adding user" });
  }
};
