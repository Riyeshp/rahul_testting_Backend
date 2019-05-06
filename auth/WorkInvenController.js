var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//inventory model
var Workinven = require("../WorkInven/WorkInven");

//user model
var User = require("../user/User");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
//var config = require('../config');
require("dotenv").config();

router.post("/register", function(req, res) {
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);

  User.create(
    {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    },
    function(err, user) {
      if (err)
        return res
          .status(500)
          .send("There was a problem registering the user.");
      // create a token
      var token = jwt.sign({ id: user._id }, process.env.secret, {
        expiresIn: 60 // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token });
    }
  );
});

router.get("/profile", function(req, res) {
  var token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided." });

  jwt.verify(token, process.env.secret, function(err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });

    User.findById(decoded.id, { password: 0 }, function(err, user) {
      if (err)
        return res.status(500).send("There was a problem finding the user.");
      if (!user) return res.status(404).send("No user found.");

      res.status(200).send(user);
    });
  });
});

router.get("/all-test", function(req, res) {
  var token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided." });

  jwt.verify(token, process.env.secret, function(err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });

    Workinven.find({}, function(err, items) {
      if (err)
        return res.status(500).send("There was a problem finding the users.");
      res.status(200).send(items);
    });
  });
});

router.post("/login", function(req, res) {
  User.findOne({ email: req.body.email }, function(err, user) {
    if (err) return res.status(500).send("Error on the server.");
    if (!user) return res.status(404).send("No user found.");
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid)
      return res.status(401).send({ auth: false, token: null });
    var token = jwt.sign({ id: user._id }, process.env.secret, {
      expiresIn: 60 // expires in 24 hours
    });
    res.status(200).send({ auth: true, token: token });
  });
});

router.get("/logout", function(req, res) {
  res.status(200).send({ auth: false, token: null });
});

// Add inventory Items
router.get("/addItems", function(req, res) {
  var token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided." });

  jwt.verify(token, process.env.secret, function(err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });

    Workinven.create(
      {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      },
      function(err, item) {
        if (err)
          return res
            .status(500)
            .send("There was a problem adding items to inventory.");

        Workinven.find({}, function(err, items) {
          if (err)
            return res
              .status(500)
              .send("There was a problem finding the users.");
          res.status(200).send(items);
        });
      }
    );
  });
});

router.post("/test", function(req, res) {
  Workinven.create(
    {
      // _id: req.body._id,
      description: req.body.description,
      category: req.body.category,
      subCategory: req.body.subCategory,
      type: req.body.type,
      specification: req.body.specification,
      material: req.body.material,
      quantity: req.body.quantity,
      purchaseDate: req.body.purchaseDate

      // description: "8mm drill",
      // category: "Cutting tool",
      // subCategory: "drill",
      // type: "drill",
      // specification: "dia 8mm X length 35mm",
      // material: "HSS",
      // quantity: 2,
      // purchaseDate: "11/10/2018"
    },
    function(err, item) {
      if (err)
        return res
          .status(500)
          .send("There was a problem adding items to inventory.");
      res.status(200).send(item);
    }
  );
});

router.get("/all", function(req, res) {
  Workinven.find({}, function(err, items) {
    if (err)
      return res.status(500).send("There was a problem finding the users.");
    res.status(200).send(items);
  });
});

module.exports = router;
