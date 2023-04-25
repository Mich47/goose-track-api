const express = require("express");
const router = express.Router();
const { auth: ctrl } = require("../../controllers");
const { asyncWrapper } = require("../../helpers/asyncWrapper");
const {
  checkRegisterData,
  checkLoginData,
} = require("../../utils/authValidators");

router.post("/register", checkRegisterData, asyncWrapper(ctrl.register));
router.post("/login", checkLoginData, asyncWrapper(ctrl.login));

module.exports = router;
