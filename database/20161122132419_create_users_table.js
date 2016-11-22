exports.up = (knex, Promise) => Promise.all([
  knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('name');
    table.string('email').unique();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  }),
]);

exports.down = (knex, Promise) => Promise.all([
  knex.schema.dropTable('users'),
]);
