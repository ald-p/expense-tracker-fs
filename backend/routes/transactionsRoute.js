const express = require('express');
const router = express.Router();

/* Connection to database */
const queries = require('../../db/database');

// Get all transactions
router.get('/', async (req, res) => {
  const transactions = await queries.getTransactions();

  if (transactions) {
    res.status(200).json(transactions);
  } else {
    res.status(500).json({ message: 'Unable to retrieve transactions.' });
  }
});

// Validate request body - middleware
function validateTransactionBody(req, res, next) {
  if (
    req.body.date &&
    req.body.name &&
    req.body.amount &&
    req.body.category_id
  ) {
    next();
  } else {
    res.status(500).json({
      message:
        'Invalid request. Please ensure all transaction request requirements are met. ',
    });
  }
}

// Add Transaction
router.post('/', validateTransactionBody, async (req, res) => {
  const transaction = req.body;
  const addedTransaction = await queries.addTransaction(transaction);

  if (addedTransaction) {
    res.status(201).json(addedTransaction);
  } else {
    res.status(500).json({ message: 'Error. Could not add transaction.' });
  }
});

// Delete Transaction
router.delete('/:id', async (req, res) => {
  const reqId = req.params.id;
  const deleteTransactionQty = await queries.deleteTransaction(reqId);

  if (deleteTransactionQty > 0) {
    res.status(200).json({});
  } else {
    res
      .status(404)
      .json({ message: 'Invalid ID. Could not find transaction to delete. ' });
  }
});

module.exports = router;
