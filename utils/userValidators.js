const Joi = require("joi");
const { joiRegex } = require("../constants");
const { getJoiErrorMessage, AppError } = require("../helpers");

exports.checkUpdateData = (req, _, next) => {
  const schema = Joi.object({
    name: Joi.string().regex(joiRegex.NAME_REGEX).min(3).max(16).required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    phone: Joi.string().regex(joiRegex.PHONE_REGEX).allow(null, ""),
    telegram: Joi.string().regex(joiRegex.TELEGRAM_REGEX).allow(null, ""),
    birthday: Joi.date().iso().min("1914-01-01").max(Date.now()),
  });

  const { error } = schema.validate(req.body);

  if (!error) return next();

  const message = getJoiErrorMessage(error);

  next(new AppError(400, message));
};
