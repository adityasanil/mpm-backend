const mongoose = require("mongoose");
// const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true }
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    {
      id: this._id,
      email: this.email,
      username: this.username,
      isAdmin: this.isAdmin
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

const Users = mongoose.model("Users", userSchema);

// function validateUser(user) {
//   const schema = {
//     username: Joi.string().required(),
//     email: Joi.string()
//       .required()
//       .min(6)
//       .max(255)
//       .email(),
//     isAdmin: Joi.boolean()
//     // password: Joi.string()
//     //   .required()
//     //   .min(6)
//     //   .max(1024)
//   };

//   return Joi.validate(user, schema);
// }

// exports.validate = validateUser;

exports.User = Users;
