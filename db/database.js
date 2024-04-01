const config = require('./knexfile').development;
const knex = require('knex')(config);

// Queries
function getTransactions() {
  return knex('transactions')
    .join('categories', 'categories.id', 'transactions.category_id')
    .then((result) => console.log(result))
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
}

function getCategories() {
  return knex('categories')
    .then((result) => result)
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
}

function getTransactionsInCategory(category_id) {
  return knex('categories')
    .where('id', category_id)
    .first()
    .then((category) => {
      knex('transactions')
        .where('category_id', category.id)
        .then((transactions) => {
          category.transactions = transactions;
          console.log(category);
        });
    });
}

// module.exports = { getTransactions, getCategories }
