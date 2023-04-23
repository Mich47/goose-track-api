/**
 * Check Joi.ValidationError
 * @param {*} error - Joi.ValidationError
 * @returns Error message
 */
exports.getJoiErrorMessage = (error) => {
  const {
    type,
    context: { key },
  } = error.details[0];

  const isRequired = type === "any.required";
  if (isRequired) {
    return `missing required "${key}" field`;
  }

  let { message } = error.details[0];

  if (type === "string.pattern.base") {
    switch (key) {
      case "name":
        message = "Name may contain only letters, apostrophe, dash and spaces";
        break;

      case "phone":
        message =
          "Phone number must be digits and can contain spaces, dashes, parentheses and can start with +";
        break;

      case "password":
        message =
          "A password must contain minimum six characters, at least one letter and one number";
        break;

      case "telegram":
        message =
          "Telegram username must start with @ and contain at least 5 characters, only lowercase letters, digits, and underscores";
        break;
    }
  }

  if (type === "date.format") {
    message = "Birthday must be in ISO 8601 date format, YYYY-MM-DD";
  }

  return message;
};
