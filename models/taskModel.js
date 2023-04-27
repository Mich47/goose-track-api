const { Schema, model, Types } = require('mongoose');

const { ENUM_PRIORITY, ENUM_STATUS } = require('../constants/enums');

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: (true, 'Set title of task.'),
    },
    start: {
      type: String,
      required: (true, 'Set start time of task.'),
    },
    end: String,
    priority: {
      type: String,
      enum: ENUM_PRIORITY,
      default: ENUM_PRIORITY[0],
    },
    status: {
      type: String,
      enum: ENUM_STATUS,
      default: ENUM_STATUS[0],
    },
    createDay: Number,
    createMonth: Number,
    createYear: Number,
    owner: {
      type: Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false }
);

const Task = model('task', taskSchema);

exports.getTasksMonth = async (owner, params) => {
  try {
    const tasks = [];

    const { month: createMonth, year: createYear } = params;
    const dayInMonth = new Date(createYear, createMonth, 0).getDate();

    for (let createDay = 0; createDay < dayInMonth; createDay += 1) {
      const findOptions = {
        $and: [{ owner }, { createDay }, { createMonth }, { createYear }],
      };
      const tasksDay = await Task.find(findOptions);
      tasks.push(tasksDay);
    }

    return tasks;
  } catch (error) {
    console.log(error);
  }
};

exports.addTask = async (owner, body) => {
  try {
    body.owner = owner;
    const date = body.date ? new Date(body.date) : new Date();

    body.createDay = date.getDate();
    body.createMonth = date.getMonth();
    body.createYear = date.getFullYear();

    const task = await Task.create(body);

    return task;
  } catch (error) {
    console.log(error);
  }
};

exports.updateTask = async (taskId, body) => {
  try {
    return await Task.findByIdAndUpdate(taskId, body, { new: true });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteTask = async (taskId) => {
  try {
    await Task.findByIdAndDelete(taskId);
  } catch (error) {
    console.log(error);
  }
};

exports.getById = async (taskId) => {
  try {
    const task = await Task.findById(taskId);

    return task;
  } catch (error) {
    console.log(error);
  }
};
