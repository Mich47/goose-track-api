const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const { jwtToken } = require("../helpers");
// const uuid = require("uuid").v4;

const userModel = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Set password for user"],
  },
  token: {
    type: String,
    default: null,
  },
});

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
userModel.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

/**
 * Auto token generating for new user
 */
userModel.post("validate", function (_, next) {
  if (this.token) return next();

  this.token = jwtToken.jwtTokenSign(this._id);

  next();
});

userModel.methods.comparePassword = (myPlaintextPassword, hash) =>
  bcrypt.compare(myPlaintextPassword, hash);

const User = model("users", userModel);

module.exports = User;
