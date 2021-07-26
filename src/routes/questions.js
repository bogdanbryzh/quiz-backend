import { Router } from 'express';
import { QuestionModel as Question } from '../models/Question.js';
import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

const router = Router();

const isValidObjectId = id => {
  if (ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) === id) return true;
    return false;
  }
  return false;
};

router.use('/:questionID', (req, res, next) => {
  const { questionID } = req.params;

  res.locals.questionID = questionID;

  if (isValidObjectId(questionID)) {
    return next();
  }
  res.status(400).json({ error: 'Invalid question ID' });
});

router.get('/', (req, res) => {
  Question.find({}, (err, questions) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (Array.isArray(questions) && questions.length) {
      return res.status(200).json(questions);
    }

    res.status(404).json({ error: 'No questions found' });
  });
});

router.get('/:questionID', (req, res) => {
  const { questionID } = res.locals;

  Question.findOne({ _id: questionID }, (err, question) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (question) {
      return res.status(200).json(question);
    }

    res.status(404).json({ error: 'Question not found' });
  });
});

router.post('/', (req, res) => {
  const question = new Question({ ...req.body });

  question.save();

  res
    .status(201)
    .location(
      `${req.protocol}://${req.get('host')}${req.originalUrl}/${question._id}`
    )
    .json(question);
});

router.patch('/:questionID', (req, res) => {
  const { questionID } = res.locals;
  const questionUpdate = req.body;

  Question.findOneAndUpdate(
    { _id: questionID },
    { ...questionUpdate },
    { new: true, useFindAndModify: false },
    (err, question) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (question) {
        return res.status(200).json(question);
      }
      res.status(404).json({ error: 'Question not found' });
    }
  );
});

router.delete('/', (req, res) => {
  Question.deleteMany({}, (err, smth) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    res.status(204).send();
  });
});

router.delete('/:questionID', (req, res) => {
  const { questionID } = res.locals;

  Question.findOneAndDelete({ _id: questionID }, (err, smth) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    console.log(smth);
    if (smth) {
      return res.status(204).send();
    }
    res.status(404).json({ error: 'Question not found' });
  });
});

export { router };
