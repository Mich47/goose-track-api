const express = require("express");
const { auth: ctrl } = require("../../controllers");

const router = express.Router();
const { validation } = require("../../middlewares");
const { asyncWrapper } = require("../../helpers/asyncWrapper");
const { joiSchema } = require("../../models/userModel");

router.post("/register", asyncWrapper(ctrl.register));
router.post("/login", validation(joiSchema), asyncWrapper(ctrl.login));

module.exports = router;
