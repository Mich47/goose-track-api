const NAME_REGEX = /^[a-zA-Z .'-]+$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
const PHONE_REGEX =
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{0,4}[-.\s]?\d{0,9}$/;
const TELEGRAM_REGEX = /(?: ?^@)[a-z0-9_]{5,32}/;

module.exports = { NAME_REGEX, PASSWORD_REGEX, PHONE_REGEX, TELEGRAM_REGEX };

/**
 * PASSWORD_REGEX
 * 
A password must contain:
Minimum eight characters, at least one letter and one number:

"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
Minimum eight characters, at least one letter, one number and one special character:

"^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:

"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:

"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character:

"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$"
 */
