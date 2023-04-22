const { User } = require("../models");
const { NotFoundError } = require("http-errors");

const logoutUser = async (id) => {
  return await User.findByIdAndUpdate(id, { token: null });
};

const updateUser = async (id, body) => {
  const user = await User.findByIdAndUpdate(id, body, { new: true });
  if (!user) {
    throw new NotFoundError(`Not found contact id: ${id}`);
  }
};
module.exports = {
  logoutUser,
  updateUser,
};
