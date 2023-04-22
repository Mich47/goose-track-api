const { updateUser } = require("../../services/user");
const update = async (req, res) => {
  const { _id } = req.user;
  const bodyParam = req.body;
  let updateParam = { ...bodyParam };
  if (req.file) {
    const { path: avatarURL } = req.file;
    updateParam = { avatarURL, ...bodyParam };
  }

  await updateUser(_id, updateParam);
  res.json({
    status: "success",
    message: "User updated",
    user: updateParam,
  });
};

module.exports = { update };
