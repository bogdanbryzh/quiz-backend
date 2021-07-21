import express from 'express';

const app = express();

const port = process.env.PORT || 8123;

app.get('/', (req, res) => {
  res.status(200).json({ msg: 'OK' });
});

app.get('/questions', (req, res) => {
  console.log('req');
  res.status(200).json({
    body: [
      {
        q: 'How long will it take?',
        ans: [
          { a: 'idk' },
          { a: 'wdk' },
          { a: 'hiwtl' },
          { a: '4ever', c: true },
        ],
      },
      {
        q: 'How much does it cost?',
        ans: [
          { a: 'idk' },
          { a: 'wdk' },
          { a: 'hiwtl' },
          { a: 'alot', c: true },
        ],
      },
    ],
  });
});

app.listen(port);
