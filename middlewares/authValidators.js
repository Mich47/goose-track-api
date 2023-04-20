// const { AppError } = require("../helpers");

const checkAuthData = (req, res, next) => {
  next();
  //   next(new AppError(400, "message"));
};

module.exports = { checkAuthData };
