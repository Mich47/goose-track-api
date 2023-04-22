const getCurrent = async (req, res) => {
  const { name, email, phone, avatarURL, birthday, telegram, token } = req.user;
  res.status(200).json({
    token,
    user: {
      name,
      email,
      phone,
      avatarURL,
      birthday,
      telegram,
    },
  });
};

module.exports = { getCurrent };
