/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('table_name').insert([
    {
      id: 1,
      date: '03/05/2024',
      name: 'Rent',
      is_expense: true,
      amount: 287.0,
      category_id: 7,
    },
    {
      id: 2,
      date: '03/19/2024',
      name: 'Statin',
      is_expense: true,
      amount: 12.36,
      category_id: 6,
    },
    {
      id: 3,
      date: '03/22/2024',
      name: 'Chipotle',
      is_expense: true,
      amount: 10.34,
      category_id: 3,
    },
    {
      id: 4,
      date: '03/25/2024',
      name: 'Wegmans',
      is_expense: true,
      amount: 82.91,
      category_id: 4,
    },
    {
      id: 5,
      date: '03/25/2024',
      name: 'Paycheck',
      is_expense: false,
      amount: 2779.81,
      category_id: 1,
    },
    {
      id: 6,
      date: '03/26/2024',
      name: 'Cuba Libre Restaurant',
      is_expense: true,
      amount: 118.95,
      category_id: 3,
    },
  ]);
  await knex.raw(
    `SELECT setval('transactions_id_seq', (SELECT MAX(id) FROM transactions));`
  );
};
