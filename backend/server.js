/* Requirements */
const express = require('express');
const server = express();
const PORT = 3000;

server.get('/', (req, res) => {
  res.json({ message: 'This is the Expense Tracker API' });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
