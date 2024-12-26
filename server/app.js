const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);
const loginRoute = require("./routes/loginRoute");
const signupRoute = require("./routes/signupRoute");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api", loginRoute);
app.use("/api", signupRoute);
app.use((err, req, res, next) => {
  console.log(err);
  
  res.status(err.status || 500).json({
    status: false,
    message: err.message || "Internal Server Error",
  });
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
