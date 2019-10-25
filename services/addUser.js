const _ = require("lodash");
const bcrypt = require("bcrypt");
const randomString = require("randomstring");
const { PersonalDetail, validatePD } = require("../models/PersonalDetails");
const { User, validate } = require("../models/Users");

async function registerUser(req, res) {
  user = new User(_.pick(req, ["username", "email"]));

  const salt = await bcrypt.genSalt(10);
  const passString = randomString.generate(10);
  user.password = await bcrypt.hash(passString, salt);
  // user.password = await bcrypt.hash("123456789", salt);
  user.isAdmin = false;

  const result = await user.save();

  headerResponse(user, res);
  personalDetail(req);

  return result;
}

async function personalDetail(req) {
  userPersonalDetail = new PersonalDetail(
    _.pick(req, [
      "firstName",
      "middleName",
      "lastName",
      "email",
      "username",
      "contact",
      "dob",
      "lifeMembershipNumber",
      "landlineNumber",
      "residentialAddress",
      "residentialLandline",
      "companyName",
      "product",
      "industry",
      "comapanyWebsite",
      "businessIncorporationDate",
      "facebookLink",
      "linkedinLink",
      "instagramLink",
      "twitterLink",
      "area",
      "married",
      "bloodGroup",
      "programmeApplied"
    ])
  );

  await userPersonalDetail.save();
}

function headerResponse(user, res) {
  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, ["_id", "username", "email"]));
}

exports.registerUser = registerUser;
exports.personalDetail = personalDetail;
