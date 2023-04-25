const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');

const { connectToMongoDB } = require('./db');

const authRouter = require("./routes/api/auth");
const userRouter = require("./routes/api/user");
const tasksRouter = require("./routes/api/tasksRouters");

const app = express();
dotenv.config({ path: './.env' });

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

connectToMongoDB();

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use(express.static("public"));

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Goose Track API",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "string",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  servers: ["https://goose-track-api2.onrender.com"],
  apis: ["app.js", "routes/api/auth.js", "routes/api/user.js"],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/tasks", tasksRouter);

// app.use(express.static("public"));

app.use((_, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, _, res, __) => {
  const status = err.status || 500;
  res.status(status).json({ message: err.message });
});

module.exports = app;
