const _ = require("lodash");
const express = require("express");
const router = express.Router();
const { User } = require("../models/Users");
const { PersonalDetail } = require("../models/PersonalDetails");

router.get("/", async (req, res) => {
  const users = await User.find().select("-password -isAdmin -__v");
  res.send(users);
});

router.get("/industry/:industry", async (req, res) => {
  let userList = await PersonalDetail.find({
    industry: req.params.industry
  }).select("-password -isAdmin -__v");
  res.send(userList);
});

router.get("/:email", async (req, res) => {
  let user = await PersonalDetail.findOne({ email: req.params.email }).select(
    "-password -isAdmin -__v"
  );
  res.send(user);
});

router.get("/profile/:id", async (req, res) => {
  let user = await PersonalDetail.findOne({ _id: req.params.id }).select(
    "-password -isAdmin -__v"
  );
  res.send(user);
});

module.exports = router;
