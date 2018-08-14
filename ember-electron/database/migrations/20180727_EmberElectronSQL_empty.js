/*
 * KNEX DATABASE MIGRATION FILE
 * https://knexjs.org/#Migrations
 * Used to build our default sqlite database files
 **/
exports.up = function(knex, Promise) {
  // Return a promise
  return Promise.all([
    // Create database table 'tasks'.
    // Important: table name is plural inline with ember data convention 
    knex.schema.createTableIfNotExists('tasks', (table) => {
      // Important: ember data needs an ID for each data set
      table.increments('id').primary();
      table.boolean('isCompleted').notNull().defaultTo(false);
      table.integer('priority').notNull().defaultTo(0);
      table.string('name');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
      knex.schema.dropTable('tasks'),
  ]);
};