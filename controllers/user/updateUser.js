const { updateUser } = require("../../services/user");
const update = async (req, res) => {
  const { _id, token } = req.user;
  const bodyParam = req.body;
  let updateParam = { ...bodyParam };

  if (req.file) {
    const { path: avatarURL } = req.file;
    updateParam = { avatarURL, ...bodyParam };
  }

  const user = await updateUser(_id, updateParam);

  res.status(200).json({
    token,
    user,
  });
};

module.exports = { update };
