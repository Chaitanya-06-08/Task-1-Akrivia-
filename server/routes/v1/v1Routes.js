const express = require("express");
const router = express.Router();
const loginRoute = require("./loginRoute");
const signupRoute = require("./signupRoute");
const logoutRoute = require("./logoutRoute");
const verifyTokenRoute = require("./verifyToken");
const airlinesRoute = require("./airlinesRoute");

router.use(loginRoute);
router.use(signupRoute);
router.use(logoutRoute);
router.use(verifyTokenRoute);
router.use(airlinesRoute);

module.exports = router;
