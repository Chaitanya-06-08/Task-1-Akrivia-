const jwt = require("jsonwebtoken");
const generateAccessToken = require("../utils/generateAccessToken");
module.exports.verifyToken = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;
  if (!accessToken)
    return res.status(401).json({ status: false, msg: "Unauthorized" });
  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err instanceof jwt.TokenExpiredError) {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, payload) => {
          if (err)
            return res.status(401).json({ status: false, msg: "Unauthorized" });
          req.cookies.accessToken = generateAccessToken(payload.email);
          req.user = { email: payload.email };
          next();
        }
      );
    }
    req.user = { email: payload.email };
    next();
  });
};
