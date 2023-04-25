const { updateUser } = require('../../services/user');

const update = async (req, res) => {
  const { _id, token } = req.user;
  const { body } = req;

  if (req.file) {
    const { path: avatarURL } = req.file;
    body.avatarURL = avatarURL;
  }

  const user = await updateUser(_id, body);

  res.status(200).json({
    token,
    user,
  });
};

module.exports = { update };
