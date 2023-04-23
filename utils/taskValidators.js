const Joi = require('joi');

exports.taskValidator = (data) =>
  Joi.object()
    .keys({
      title: Joi.string().min(2).max(256).required(),
      start: Joi.string().required(),
      end: Joi.string().required(),
      priority: Joi.string(),
    })
    .validate(data);

exports.dateValidator = (data) => {
  const { date } = data;
  if (date) {
    return Joi.object()
      .keys({
        date: Joi.date(),
      })
      .validate(data);
  }
};
