const Joi = require('joi');
const { joiRegex } = require('../constants');
// const { getJoiErrorMessage, AppError } = require('../helpers');

exports.checkUpdateData = (body) => {
  const { name, email, phone, telegram, birthday, status } = body;
  if (name) {
    const data = { name };
    const { error } = Joi.object()
      .keys({
        name: Joi.string().regex(joiRegex.NAME_REGEX).min(3).max(16),
      })
      .validate(data);
    if (error) {
      return error;
    }
  }

  if (email) {
    const data = { email };
    const { error } = Joi.object()
      .keys({
        email: Joi.string().email({ tlds: { allow: false } }),
      })
      .validate(data);
    if (error) {
      return error;
    }
  }

  if (phone) {
    const data = { phone };
    const { error } = Joi.object()
      .keys({
        phone: Joi.string().regex(joiRegex.PHONE_REGEX).allow(null, ''),
      })
      .validate(data);
    if (error) {
      return error;
    }
  }

  if (telegram) {
    const data = { telegram };
    const { error } = Joi.object()
      .keys({
        telegram: Joi.string().regex(joiRegex.TELEGRAM_REGEX).allow(null, ''),
      })
      .validate(data);
    if (error) {
      return error;
    }
  }

  if (birthday) {
    const date = new Date(birthday);
    const data = { date };
    const { error } = Joi.object()
      .keys({
        date: Joi.date().iso().min('1914-01-01').max(Date.now()),
      })
      .validate(data);
    if (error) {
      return error;
    }
  }

  return null;
};

// exports.checkUpdateData_ = (req, _, next) => {
//   const schema = Joi.object({
//     name: Joi.string().regex(joiRegex.NAME_REGEX).min(3).max(16).required(),
//     email: Joi.string()
//       .email({ tlds: { allow: false } })
//       .required(),
//     phone: Joi.string().regex(joiRegex.PHONE_REGEX).allow(null, ''),
//     telegram: Joi.string().regex(joiRegex.TELEGRAM_REGEX).allow(null, ''),
//     birthday: Joi.date().iso().min('1914-01-01').max(Date.now()),
//   });

//   const { error } = schema.validate(req.body);

//   if (!error) return next();

//   const message = getJoiErrorMessage(error);

//   next(new AppError(400, message));
// };
