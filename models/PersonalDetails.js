const mongoose = require("mongoose");
const Joi = require("joi");
const mongoostatic = require("mongoosastic");

const personaDetailsSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  contact: { type: String, required: true },
  programmeApplied: { type: String, required: true },
  dob: { type: String, required: true },
  lifeMembershipNumber: { type: String, required: true },
  landlineNumber: { type: String, required: true },
  residentialAddress: { type: String, required: true },
  residentialLandline: { type: String, required: true },
  companyName: { type: String, required: true },
  product: { type: String, required: true },
  industry: { type: String, required: true },
  comapanyWebsite: { type: String, required: true },
  businessIncorporationDate: { type: String, required: true },
  facebookLink: { type: String, required: true },
  linkedinLink: { type: String, required: true },
  instagramLink: { type: String, required: true },
  twitterLink: { type: String, required: true },
  area: { type: String, required: true },
  married: { type: String, required: true },
  bloodGroup: { type: String, required: true }
});

personaDetailsSchema.plugin(mongoostatic, {
  host: "localhost",
  port: 9200
});

// userSchema.methods.generateAuthToken = function() {
//   const token = jwt.sign(
//     {
//       id: this._id,
//       email: this.email,
//       name: this.firstName + " " + this.lastName
//     },
//     config.get("jwtPrivateKey")
//   );
//   return token;
// };

const PersonalDetails = mongoose.model("PersonalDetails", personaDetailsSchema);

PersonalDetails.createMapping((err, mapping) => {
  console.log("mapping created");
});

function validateUser(personaDetailsSchema) {
  const schema = {
    firstName: Joi.string().required(),
    username: Joi.string().required(),
    middleName: Joi.string().required(),
    lastName: Joi.string().required(),
    contact: Joi.string().required(),
    programmeApplied: Joi.string().required(),
    dob: Joi.string().required(),
    lifeMembershipNumber: Joi.string().required(),
    residentialAddress: Joi.string().required(),
    residentialLandline: Joi.string().required(),
    area: Joi.string().required(),
    married: Joi.string().required(),
    bloodGroup: Joi.string()
      .required()
      .label("Blood Group"),
    companyName: Joi.string().required(),
    product: Joi.string().required(),
    industry: Joi.string().required(),
    comapanyWebsite: Joi.string().required(),
    landlineNumber: Joi.string().required(),
    businessIncorporationDate: Joi.string().required(),
    facebookLink: Joi.string().required(),
    linkedinLink: Joi.string().required(),
    instagramLink: Joi.string()
      .required()
      .label("Instagram"),
    twitterLink: Joi.string().required(),
    email: Joi.string()
      .required()
      .min(6)
      .max(255)
      .email()
  };

  return Joi.validate(personaDetailsSchema, schema);
}

exports.PersonalDetail = PersonalDetails;
exports.validatePD = validateUser;
