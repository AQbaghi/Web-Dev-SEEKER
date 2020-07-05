const express = require('express');

const app = express();

app.get('/api/jobs', (req, res) => {
  const jobs = [
    { id: 1, jobTitle: 'Web Developer' },
    { id: 2, jobTitle: 'Software Engineer' },
    { id: 3, jobTitle: 'Clown' },
  ];

  res.json(jobs);
});

app.listen(5000, () => {
  console.log('Server up and running on port 5000');
});
