const NAME_REGEX = /^[a-zA-Z .'-]+$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,64}$/;
const PHONE_REGEX =
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{0,4}[-.\s]?\d{0,9}$/;
const TELEGRAM_REGEX = /(?: ?^@)[a-z0-9_]{5,32}$/;
const YEAR_REGEX = /^\d{4,4}$/;
const MONTH_DAY_REGEX = /^\d{2,2}$/;

module.exports = {
  NAME_REGEX,
  PASSWORD_REGEX,
  PHONE_REGEX,
  TELEGRAM_REGEX,
  YEAR_REGEX,
  MONTH_DAY_REGEX,
};
