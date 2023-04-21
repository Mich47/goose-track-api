const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const { connectToMongoDB } = require("./db");

const authRouter = require("./routes/api/auth");
const userRouter = require("./routes/api/user");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

connectToMongoDB();

// app.use("/api/users", authRouter);

app.use("/auth", authRouter);
app.use("/user", userRouter);
// app.use("/user", userRouter);

// app.use(express.static("public"));

app.use((_, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, _, res, __) => {
  const status = err.status || 500;
  res.status(status).json({ message: err.message });
});

module.exports = app;
