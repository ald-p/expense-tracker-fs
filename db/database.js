const config = require('./knexfile').development;
const knex = require('knex')(config);

// Queries
function getTransactions() {
  return knex('transactions')
    .join('categories', 'categories.id', 'transactions.category_id')
    .select(
      'transactions.id',
      'date',
      'name',
      'is_expense',
      'amount',
      'category'
    )
    .then((result) => result)
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
}

function getCategories() {
  return knex('categories').then((result) => console.log(result));
}

getCategories();

// module.exports = { getTransactions, }
