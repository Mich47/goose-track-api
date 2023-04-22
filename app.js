const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');

const { connectToMongoDB } = require('./db');

const authRouter = require('./routes/api/auth');
const tasksRouter = require('./routes/api/tasksRouters');

const app = express();
dotenv.config({ path: './.env' });

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

connectToMongoDB();

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use(express.static('public'));

app.use('/api/users', authRouter);
app.use('/api/tasks', tasksRouter);

// app.use(express.static("public"));

app.use((_, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, _, res, __) => {
  const status = err.status || 500;
  res.status(status).json({ message: err.message });
});

module.exports = app;
