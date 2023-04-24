const Joi = require("joi");
const { joiRegex } = require("../constants");
const { getJoiErrorMessage, AppError } = require("../helpers");

exports.checkRegisterData = (req, _, next) => {
  const schema = Joi.object({
    name: Joi.string().regex(joiRegex.NAME_REGEX).min(3).max(16).required(),
    password: Joi.string().regex(joiRegex.PASSWORD_REGEX).required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
  });

  const { error } = schema.validate(req.body);

  if (!error) return next();

  const message = getJoiErrorMessage(error);

  next(new AppError(400, message));
};

exports.checkLoginData = (req, _, next) => {
  const schema = Joi.object({
    password: Joi.string().regex(joiRegex.PASSWORD_REGEX).required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
  });

  const { error } = schema.validate(req.body);

  if (!error) return next();

  const message = getJoiErrorMessage(error);

  next(new AppError(400, message));
};
