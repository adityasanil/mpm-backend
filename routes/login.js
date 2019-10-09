const _ = require("lodash");
const express = require("express");
const { User } = require("../models/Users");
const router = express.Router();
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password!");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password!");

  const token = user.generateAuthToken();
  res.send(token);
});

function validate(req) {
  const schema = {
    email: Joi.string()
      .required()
      .min(6)
      .max(255)
      .email(),
    password: Joi.string()
      .required()
      .min(6)
      .max(1024)
  };

  return Joi.validate(req, schema);
}

module.exports = router;
