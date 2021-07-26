import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import { MONGODB_URI } from './config.js';
import { VersionModel as Version } from './models/Version.js';

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

Version.findOne({}, (err, version) => {
  if (err) {
    return console.log(err);
  }
  if (version) {
    const { major, minor, patch } = version;
    return console.log('questions version', `${major}.${minor}.${patch}`);
  }
  const newVersion = new Version({ major: 1, minor: 0, patch: 0 });
  newVersion.save();
});

import { router as questionsRoutes } from './routes/questions.js';
import { router as versionRoute } from './routes/version.js';

app.use('/', (req, res) => {
  res.redirect(301, 'https://editor.bogdanbryzh.me');
});
app.use('/questions', questionsRoutes);
app.use('/version', versionRoute);

app.listen(port, () => console.log(`server is running`));
