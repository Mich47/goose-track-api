const express = require("express");
const router = express.Router();
const { auth, validation } = require("../../middlewares");
const { asyncWrapper } = require("../../helpers/asyncWrapper");
const { user: ctrl } = require("../../controllers");
const { joiSchema } = require("../../models/userModel");

router.get("/current", auth, asyncWrapper(ctrl.getCurrent));
router.post("/logout", auth, asyncWrapper(ctrl.logout));
router.patch("/info", auth, validation(joiSchema), asyncWrapper(ctrl.update));

module.exports = router;
