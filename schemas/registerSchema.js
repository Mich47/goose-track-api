const Joi = require("joi");
const { joiRegex } = require("../constants");

const registerSchema = Joi.object({
  name: Joi.string().regex(joiRegex.NAME_REGEX).min(3).max(16).required(),
  password: Joi.string().regex(joiRegex.PASSWORD_REGEX).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
});

module.exports = registerSchema;
