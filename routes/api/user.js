const express = require("express");
const router = express.Router();
const { checkAuth, validation } = require("../../middlewares");
const { asyncWrapper } = require("../../helpers/asyncWrapper");
const { user: ctrl } = require("../../controllers");
const { joiSchema } = require("../../models/userModel");

router.use(checkAuth);

router.get("/current", asyncWrapper(ctrl.getCurrent));
router.post("/logout", asyncWrapper(ctrl.logout));
router.patch("/info", asyncWrapper(ctrl.update));
// router.patch("/info", validation(joiSchema), asyncWrapper(ctrl.update));

module.exports = router;
