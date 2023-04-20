const { User } = require("../models");

/**
 * Create new user
 * @returns Object of user data
 */
const register = async ({ name, email, password }) => {
  const newUser = await User.create({ name, email, password });

  return { user: newUser };
};

module.exports = {
  register,
};
