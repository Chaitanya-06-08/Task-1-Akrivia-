const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const { generateAccessToken } = require("../utils/generateAccessToken");
const {generateRefreshToken} = require("../utils/generateRefreshToken");
module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  try {
    let user = await User.getUser(email);
    if (!user) return res.status(400).json({ msg: "User does not exist" });
    if (bcrypt.compareSync(password, user.password)) {
      const accessToken = generateAccessToken(user.email);
      const refreshToken = generateRefreshToken(user.email);
      user = { id: user.id, email: user.email };
      const options = {
        httpOnly: true,
      };
      res.cookie("accessToken", accessToken, options);
      res.cookie("refreshToken", refreshToken, options);

      return res
        .status(200)
        .json({ status: true, msg: "User logged in successfully", user });
    } else {
      return res
        .status(400)
        .json({ status: false, msg: "Invalid credentials" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.signup = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = new User(email, hashedPassword);
    await user.addUser();
    return res
      .status(200)
      .json({ status: true, msg: "User added successfully" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports.logout = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  try {
    await User.clearRefreshToken(email);
    res.clearCookie("refreshToken", { httpOnly: true });
    res.clearCookie("accessToken", { httpOnly: true });
    return res
      .status(200)
      .json({ status: true, msg: "User logged out successfully" });
  } catch (error) {
    next(error);
  }
};
