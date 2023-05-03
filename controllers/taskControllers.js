const {
  getTasksMonth,
  addTask,
  updateTask,
  deleteTask,
} = require("../models/taskModel");

exports.getTasksMonthController = async (req, res) => {
  const { user: owner, query } = req;

  const tasks = await getTasksMonth(owner, query);

  res.status(200).json(tasks);
};

exports.addTaskController = async (req, res) => {
  const { user: owner, body } = req;

  const task = await addTask(owner, body);

  res.status(201).json(task);
};

exports.updateTaskController = async (req, res) => {
  const {
    params: { id },
    body,
  } = req;

  const task = await updateTask(id, body);

  res.status(200).json(task);
};

exports.deleteTaskController = async (req, res) => {
  const { id } = req.params;

  await deleteTask(id);

  res.status(200).json({ message: "Task was deleted." });
};
