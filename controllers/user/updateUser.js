const { updateUser } = require("../../services/user");

const update = async (req, res) => {
  const userId = req.user.id;
  const updateFields = req.body;

  const updatedUser = await updateUser(userId, updateFields);

  res.status(200).json({
    status: "success",
    message: "User updated",
    user: updatedUser,
  });
};

module.exports = { update };
