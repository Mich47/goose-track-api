const Joi = require('joi');

exports.taskValidator = (data) => {
  if (data.date) {
    data.date = new Date(data.date);
  }
  return Joi.object()
    .keys({
      title: Joi.string().min(2).max(256).required(),
      start: Joi.string().required(),
      end: Joi.string().allow(null, ''),
      priority: Joi.string(),
      date: Joi.date(),
    })
    .validate(data);
};
