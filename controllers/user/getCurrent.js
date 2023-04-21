const getCurrent = async (req, res) => {
  const { id, name, email, phone, avatarURL, birthday, telergam } = req.user;
  res.status(200).json({
    user: {
      id,
      name,
      email,
      phone,
      avatarURL,
      birthday,
      telergam,
    },
  });
};

module.exports = { getCurrent };
