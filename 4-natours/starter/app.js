const express = require('express');
const app = express();
const port = process.env.PORT || 8001;

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World from nodejs', app: 'Natours' });
});

app.post('/', (req, res) => {
    res.status(200).send('you can post to this endpoint');
})

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
