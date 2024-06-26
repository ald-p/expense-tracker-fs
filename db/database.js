const config = require('./knexfile').development;
const knex = require('knex')(config);

// Queries
// get all transactions joined with category name
function getTransactions() {
  return knex('transactions')
    .join('categories', 'categories.id', 'transactions.category_id')
    .select(
      'transactions.id',
      'date',
      'name',
      'is_expense',
      'amount',
      'category_id',
      'category'
    )
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return false;
    });
}

// get all categories
function getCategories() {
  return knex('categories')
    .then((result) => result)
    .catch((err) => {
      return false;
    });
}

// create category
function addCategory(category) {
  return knex('categories')
    .insert({ category }, '*')
    .then((result) => result[0])
    .catch((err) => {
      return false;
    });
}

// With given category id, get transactions associated with that category
function getTransactionsInCategory(category_id) {
  return knex('categories')
    .where('id', category_id)
    .first()
    .then((category) => {
      return knex('transactions')
        .where('category_id', category.id)
        .then((transactions) => {
          category.transactions = transactions;
          return category;
        })
        .catch((err) => {
          console.log(err);
          process.exit(1);
        });
    })
    .catch((err) => {
      return false;
    });
}

// create transaction
function addTransaction(transaction) {
  return knex('transactions')
    .insert(transaction, '*')
    .then((result) => result[0])
    .catch((err) => {
      return false;
    });
}

// delete transaction
function deleteTransaction(transaction_id) {
  return knex('transactions')
    .del()
    .where('id', transaction_id)
    .then((result) => result)
    .catch((err) => {
      return false;
    });
}

module.exports = {
  getTransactions,
  getCategories,
  addCategory,
  getTransactionsInCategory,
  addTransaction,
  deleteTransaction,
};
