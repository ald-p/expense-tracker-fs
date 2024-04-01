const express = require('express');
const router = express.Router();

/* Connection to database */
const queries = require('../../db/database');

// Get all categories
router.get('/', async (req, res) => {
  const categories = await queries.getCategories();

  if (categories) {
    res.status(200).json(categories);
  } else {
    res.status(500).json({ message: 'Unable to retrieve categories.' });
  }
});

// get transactions in category
router.get('/:id', async (req, res) => {
  const reqId = +req.params.id;
  const categoryAndTransactions = await queries.getTransactionsInCategory(
    reqId
  );

  if (categoryAndTransactions) {
    res.status(200).json(categoryAndTransactions);
  } else {
    res
      .status(500)
      .json({ message: 'Unable to retrieve transactions in category.' });
  }
});

module.exports = router;
