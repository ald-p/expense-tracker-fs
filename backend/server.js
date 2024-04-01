/* Requirements */
const express = require('express');
const server = express();
const PORT = 3000;

// Enable CORS
const cors = require('cors');
server.use(cors());

// Body parsers
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Home Route
server.get('/', (req, res) => {
  res.json({ message: 'This is the Expense Tracker API' });
});

/* Router */
// Transactions Controller
const transactionsRoute = require('./routes/transactionsRoute');
server.use('/transactions', transactionsRoute);

// Categories Controller
const categoriesRoute = require('./routes/categoriesRoute');
server.use('/categories', categoriesRoute);

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
