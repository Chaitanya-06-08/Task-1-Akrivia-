const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const loginRoute = require("./routes/loginRoute");
const signupRoute = require("./routes/signupRoute");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(loginRoute);
app.use(signupRoute);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
