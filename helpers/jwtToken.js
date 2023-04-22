const jwt = require("jsonwebtoken");
require("dotenv").config();

const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

const jwtToken = {
  jwtTokenSign: (id) =>
    jwt.sign({ id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    }),

  jwtTokenVerify: (token) => jwt.verify(token, JWT_SECRET),
};

module.exports = jwtToken;
