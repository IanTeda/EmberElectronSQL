/*
 * KNEXFILE
 * https://knexjs.org/#knexfile
 * Basic configuration
 **/
module.exports = {
  // Sqlite SQL client
  client: 'sqlite3',
  connection: {
    // Use note resolve current directory './ember-electron/database'
    filename: require('path').resolve(__dirname, 'EmberElectronSQL_empty.sqlite')
  },
  // Knex:warning - sqlite does not support inserting default values.
  useNullAsDefault: true,
};
