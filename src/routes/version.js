import { Router } from 'express';
import { VersionModel as Version } from '../models/Version.js';

const router = Router();

router.get('/', (req, res) => {
  // combine two sources: patch - when question get updated and minor - when new question added or deleted
  // major version update only when deleted all questions and started from scratch
  // all part of semver updates incrementally
  Version.findOne({}, (err, version) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (version) {
      const { major, minor, patch } = version;
      return res.status(200).json({ version: `${major}.${minor}.${patch}` });
    }
    res.status(400).json({ error: 'I dunno. Something went wrong' });
  });
});

export { router };
