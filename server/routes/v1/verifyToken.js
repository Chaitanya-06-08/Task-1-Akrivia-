const express = require("express");
const router = express.Router();
const { verifyTokenMiddleware } = require("../../middleware/verifyToken");
const User = require("../../services/userService");
router.get("/verifyAccessToken", verifyTokenMiddleware, async (req, res, next) => {
  if (req.user?.email) {
    try {
      let user = await User.getUser(req.user.email);
      user = { id: user.id, email: user.email };
      res.cookie("accessToken", req.cookies.accessToken, { httpOnly: true });
      return res.status(200).json({ status: true, msg: "Authorized", user });
    } catch (error) {
      next(error);
    }
  }
});
module.exports = router;
