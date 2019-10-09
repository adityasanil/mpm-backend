const _ = require("lodash");
const express = require("express");
const { User } = require("../models/Users");
const { validatePD } = require("../models/PersonalDetails");
const router = express.Router();
const bcrypt = require("bcrypt");
const { registerUser, personalDetail } = require("../services/addUser");

router.post("/", async (req, res) => {
  const { error } = validatePD(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered!");

  // user = new User({
  //   username: req.body.username,
  //   email: req.body.email,
  //   password: req.body.password
  // });

  registerUser(req.body, res)
    .then(personalDetail(req.body))
    .catch(err => console.log(err));
});

module.exports = router;
