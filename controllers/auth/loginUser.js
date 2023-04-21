const { loginUser } = require("../../services/authService");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { login };
