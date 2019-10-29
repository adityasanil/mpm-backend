const _ = require("lodash");
const express = require("express");
const { User } = require("../models/Users");
const { validatePD } = require("../models/PersonalDetails");
const router = express.Router();
const bcrypt = require("bcrypt");
const { registerUser, personalDetail } = require("../services/addUser");
const { PersonalDetail } = require("../models/PersonalDetails");

router.post("/", async (req, res) => {
  const { error } = validatePD(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let userEmail = await User.findOne({
    email: req.body.email
  });
  if (userEmail)
    return res.status(400).send("User with this email-ID registered already!");

  let userName = await User.findOne({
    username: req.body.username
  });
  if (userName) return res.status(400).send("Choose a different username");

  // user = new User({
  //   username: req.body.username,
  //   email: req.body.email,
  //   password: req.body.password
  // });

  registerUser(req.body, res).catch(err => console.log(err));
});

router.put("/:id", async (req, res) => {
  // res.json(req.body);
  const updateObj = req.body;
  const user = await PersonalDetail.findByIdAndUpdate(
    req.params.id,
    {
      $set: updateObj
    },
    { new: true }
  );
  if (!user) res.status(404).send("User with email id not found");
  res.send(user);
});

module.exports = router;
