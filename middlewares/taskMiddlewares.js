const { Types } = require("mongoose");
const { getById } = require("../models/taskModel");
const { taskValidator } = require("../utils/taskValidators");

exports.checkTaskId = async (req, res, next) => {
  const {
    params: { id },
    user,
  } = req;

  const task = await getById(id);

  if (!task || !Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Task not found" });
  }

  if (task.owner._id.toString() !== user._id.toString()) {
    return res.status(404).json({ message: "Task not found" });
  }

  next();
};

exports.checkBody = async (req, res, next) => {
  const { body } = req;

  if (!Object.keys(body).length) {
    return res.status(400).json({ message: "There is no one field." });
  }

  next();
};

exports.checkData = async (req, res, next) => {
  const { body } = req;

  const { error } = taskValidator(body);
  if (error) {
    res
      .status(400)
      .json({ message: `Do not valid field ${error.details[0].context.key}` });
  }

  next();
};
