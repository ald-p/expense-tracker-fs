/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('transactions', (table) => {
    table.increments();
    table.date('date');
    table.boolean('is_expense');
    table.decimal('amount', 14, 2);
    table.integer('category_id').notNullable();
    table.foreign('category_id').references('id').inTable('categories');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('transactions');
};
