const createError = require("http-errors");
const validation = (schema, message) => {
  return (req, res, next) => {
    console.log(req.body);
    if (Object.keys(req.body).length === 0) {
      return next(createError(400, "missing fields"));
    }
    const { error } = schema.validate(req.body);
    if (error) {
      const errorMessage = error.details.map((detail) => {
        return detail.context.label;
      });
      return next(createError(400, `${message}: ${errorMessage}`));
    }
    return next();
  };
};

module.exports = validation;
