const { Router } = require("express");
const {
  getTasksMonthController,
  addTaskController,
  updateTaskController,
  deleteTaskController,
} = require("../../controllers/taskControllers");
const { checkAuth } = require("../../middlewares/authMiddlewares");
const {
  checkBody,
  checkData,
  checkTaskId,
} = require("../../middlewares/taskMiddlewares");

const router = Router();

router.use(checkAuth);

router
  .route("/")
  .get(getTasksMonthController)
  .post(checkBody, checkData, addTaskController);

router.use("/:id", checkTaskId);

router
  .route("/:id")
  .patch(checkBody, updateTaskController)
  .delete(deleteTaskController);

module.exports = router;
