const { Schema, model } = require("mongoose");
const Joi = require("joi");
// const bcrypt = require("bcrypt");
// const { jwtToken } = require("../helpers");
// const uuid = require("uuid").v4;

const userModel = Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    phone: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      default: null,
    },
    telegram: {
      type: String,
      default: null,
    },
    birthday: {
      type: String,
      default: null,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false }
);

/**
 * Auto verification token generating
 */
// userModel.pre("validate", async function (next) {
//   if (this.isNew) {
//     this.verificationToken = uuid().replace(/-./g, "");
//   }

//   next();
// });

/**
 * Auto password hashing
 */
// userModel.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();

//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);

//   next();
// });

// /**
//  * Auto token generating for new user
//  */
// userModel.post("validate", function (_, next) {
//   if (this.token) return next();

//   this.token = jwtToken.jwtTokenSign(this._id);

//   next();
// });

// userModel.methods.comparePassword = (myPlaintextPassword, hash) =>
//   bcrypt.compare(myPlaintextPassword, hash);

const User = model("user", userModel);

const joiSchema = Joi.object({
  name: Joi.string(),
  password: Joi.string().required().messages({
    "any.required": "Set password for user",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
  }),
  phone: Joi.string().allow(null),
  avatarURL: Joi.string().allow(null),
  telegram: Joi.string().allow(null),
  birthday: Joi.string().allow(null),
  token: Joi.string().allow(null),
});

module.exports = { User, joiSchema };
