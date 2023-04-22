const { Conflict, Unauthorized } = require("http-errors");
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwtToken = require("../helpers/jwtToken");

const registerUser = async (name, email, password) => {
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }

  const result = await User.create({
    name,
    email,
    password,
    // verificationToken, ???
  });

  const { phone, avatarURL, telegram, birthday, token } = result;

  return { token, user: { email, name, phone, avatarURL, telegram, birthday } };
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new Unauthorized("Email or password is wrong");
  }

  const token = jwtToken.jwtTokenSign(user._id);

  await User.findByIdAndUpdate(user._id, { token });

  const { name, phone, avatarURL, telegram, birthday } = user;

  return { token, user: { email, name, phone, avatarURL, telegram, birthday } };
};

module.exports = { registerUser, loginUser };
