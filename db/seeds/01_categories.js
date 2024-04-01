/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Insert category data into table
  await knex('categories').insert([
    { id: 1, category: 'Income' },
    { id: 2, category: 'Automotive' },
    { id: 3, category: 'Dining' },
    { id: 4, category: 'Groceries' },
    { id: 5, category: 'Entertainment' },
    { id: 6, category: 'Medical' },
    { id: 7, category: 'Housing' },
    { id: 8, category: 'Utitilies' },
  ]);
  // reset category_id_seq to highest value from data
  await knex.raw(
    `SELECT setval('categories_id_seq', (SELECT MAX(id) FROM categories));`
  );
};
