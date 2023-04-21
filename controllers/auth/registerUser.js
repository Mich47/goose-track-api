const { registerUser } = require("../../services/authService");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await registerUser(name, email, password);

  res.status(201).json({
    user: { email: user.email },
  });
};

module.exports = { register };
