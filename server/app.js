const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const routes = require('./routes/Routes')

app.use("/api",routes);

app.use((err, req, res, next) => {
  console.log(err);

  return res.status(err.status || 500).json({
    status: false,
    message: err.message || "Internal Server Error",
  });
});
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
