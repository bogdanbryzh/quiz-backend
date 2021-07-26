import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import { join, resolve } from 'path';
import mongoose from 'mongoose';
import { MONGODB_URI } from './config.js';

mongoose.connect(
  MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  err => {
    if (err) return console.error(err);
    console.log('connected to db');
  }
);

const port = process.env.PORT;
const app = express();

app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

app.use(express.static(join(resolve(), 'public')));

import { router as questionsRoutes } from './routes/questions.js';

app.use('/questions', questionsRoutes);
app.use('/version', (req, res) => {
  // combine two sources: patch - when question get updated and minor - when new question added or deleted
  // major version update only when deleted all questions and started from scratch
  // all part of semver updates incrementally
  const major = 1;
  const minor = 0;
  const patch = 0;
  res.status(200).json({ version: major + '.' + minor + '.' + patch });
});

app.listen(port, () => console.log(`http://localhost:${port}`));
