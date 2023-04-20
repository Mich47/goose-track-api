const { asyncWrapper } = require("../helpers");
const authService = require("../services/authService");

/**
 * Controller. Create new user
 */
const registerUser = asyncWrapper(async (req, res) => {
  const newUser = await authService.register(req.body);

  res.status(200).json(newUser);
});

module.exports = {
  registerUser,
};
