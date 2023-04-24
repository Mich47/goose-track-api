const express = require("express");
const router = express.Router();
const { auth: ctrl } = require("../../controllers");
const { asyncWrapper } = require("../../helpers/asyncWrapper");
const {
  checkRegisterData,
  checkLoginData,
} = require("../../utils/authValidators");

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user account with a unique email address and password
 *     tags:
 *       - Authentication
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: user
 *         in: body
 *         description: User registration information
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               minLength: 3
 *               maxLength: 16
 *               pattern: "^[a-zA-Z.'-]{3,16}$"
 *               description: Name of the user 3-16 characters, allowed characters are letters, space, dot, apostrophe, dash
 *             email:
 *               type: string
 *               format: email
 *               description: Email address of the user (valid email)
 *             password:
 *               type: string
 *               pattern: ^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$
 *               description: Password of the user (at least 6 characters, must contain at least 1 letter and 1 digit)
 *     responses:
 *       201:
 *         description: User account created successfully
 *       400:
 *         description: Invalid request body or user already exists
 *       500:
 *         description: Internal server error
 */

router.post("/register", checkRegisterData, asyncWrapper(ctrl.register));

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in user
 *     description: Authenticate user credentials and return JWT token
 *     tags:
 *       - Authentication
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: credentials
 *         in: body
 *         description: User login credentials
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               format: email
 *               description: Email address of the user (valid email)
 *             password:
 *               type: string
 *               pattern: ^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$
 *               description: Password of the user (at least 6 characters, must contain at least 1 letter and 1 digit)
 *     responses:
 *       200:
 *         description: User authenticated successfully

 *       400:
 *         description: Invalid request body or user already exist
 *       500:
 *         description: Internal server error
 */

router.post("/login", checkLoginData, asyncWrapper(ctrl.login));

module.exports = router;
