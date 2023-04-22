const express = require("express");
const router = express.Router();
const { auth, validation } = require("../../middlewares");
const { asyncWrapper } = require("../../helpers/asyncWrapper");
const { user: ctrl } = require("../../controllers");
const { joiUpdateSchema } = require("../../models/userModel");

router.get("/current", auth, asyncWrapper(ctrl.getCurrent));
router.post("/logout", auth, asyncWrapper(ctrl.logout));
// router.patch("/info", auth, asyncWrapper(ctrl.update));
router.patch(
  "/info",
  auth,
  validation(joiUpdateSchema),
  asyncWrapper(ctrl.update)
);

module.exports = router;
