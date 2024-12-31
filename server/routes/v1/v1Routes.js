const express = require("express");
const router = express.Router();
const loginRoute = require("./loginRoute");
const signupRoute = require("./signupRoute");
const logoutRoute = require("./logoutRoute");
const verifyToken = require("./verifyToken");

router.use(loginRoute);
router.use(signupRoute);
router.use(logoutRoute);
router.use(verifyToken);

module.exports = router;
