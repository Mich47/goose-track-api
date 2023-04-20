const express = require("express");
const { authCtrl } = require("../../controllers");
const { authValidators } = require("../../middlewares");

const router = express.Router();

router.post("/register", authValidators.checkAuthData, authCtrl.registerUser);

module.exports = router;
