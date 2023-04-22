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
