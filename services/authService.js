// const { Conflict } = require("http-errors");
// const { User } = require("../models");
// const jwt = require("jsonwebtoken");
// /**
//  * Create new user
//  * @returns Object of user data
//  */
// const register = async ({ name, email, password }) => {
//   const user = await User.findOne({ email });
//   if (user) {
//     throw new Conflict("Email in use");
//   }
//   const newUser = await User.create({ name, email, password });

//   return { user: newUser };
// };

// const login = async ({ _id }, token) => {
//   return await User.findByIdAndUpdate(_id, { token });
// };

// const findUserBy = async (data) => {
//   const user = await User.findOne(data);
//   return user;
// };

// const createToken = ({ _id }) => {
//   const { JWT_SECRET_KEY } = process.env;
//   const playload = {
//     id: _id,
//   };

const { Conflict, Unauthorized } = require("http-errors");
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { nanoid } = require("nanoid");

const { JWT_SECRET } = process.env;

const registerUser = async (name, email, password) => {
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const verificationToken = nanoid();

  const result = await User.create({
    name,
    email,
    password: hashPassword,
    verificationToken,
  });

  return result;
};
const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new Unauthorized("Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const { email: userEmail } = user;
  const userObj = { email: userEmail };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });

  return { token, user: userObj };
};

module.exports = { registerUser, loginUser };
