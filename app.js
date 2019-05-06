var express = require("express");

var db = require("./db");
var Cors = require("cors");

var app = express();

app.use(Cors());

var UserController = require("./user/UserController");
app.use("/users", UserController);

var AuthController = require("./auth/AuthController");
app.use("/api/auth", AuthController);

var WorkInvenController = require("./auth/WorkInvenController");
app.use("/api/workinven", WorkInvenController);

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

module.exports = app;
