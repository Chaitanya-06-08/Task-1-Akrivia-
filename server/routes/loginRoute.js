const express = require("express");
const router = express.Router();
router.post("/login", (req, res) => {
//   const { email, password } = req.body;
    console.log(req.body);
    console.log(req.params);
//   if (!email || !password) {
//     return res.status(400).json({ msg: "Please enter all fields" });
//   }
//   console.log(email,password);
  
  return res.json({
    msg: "Hello from login route",
  });
});
module.exports = router;
