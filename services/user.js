const { User } = require("../models");
const { NotFoundError } = require("http-errors");

const logoutUser = async (id) => {
  return await User.findByIdAndUpdate(id, { token: null });
};

const updateUser = async (id, updateFields) => {
  const user = await User.findById(id);
  if (!user) {
    throw new NotFoundError(`Not found user id: ${id}`);
  }

  Object.keys(updateFields).forEach((key) => {
    user[key] = updateFields[key];
  });

  const updatedUser = await user.save();

  return updatedUser;
};
module.exports = {
  logoutUser,
  updateUser,
};
