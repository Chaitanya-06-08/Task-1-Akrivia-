const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middleware/verifyToken");
const User = require("../../services/Users");
router.get("/verifyAccessToken", verifyToken, async (req, res, next) => {
  if (req.user.email) {
    try {
      let user = await User.getUser(req.user.email);
      user = { id: user.id, email: user.email };
      res.cookie("accessToken", req.cookies.accessToken, { httpOnly: true });
      return res.status(200).json({ status: true, msg: "Authorized", user });
    } catch (error) {
      next(error);
    }
  }
  return res.status(403).json({ status: false, msg: "Forbidden" });
});
module.exports = router;
