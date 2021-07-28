import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const QuestionSchema = Schema({
  question: {
    type: String,
    required: true,
  },
  answers: [
    {
      answer: String,
      correct: Boolean,
    },
  ],
});

const QuestionModel = model('Questions', QuestionSchema);

export { QuestionModel };
