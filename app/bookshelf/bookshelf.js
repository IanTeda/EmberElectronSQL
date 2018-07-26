/**
 * BOOKSHELF
 * http://bookshelfjs.org/
 * Initialise the Knex client instance
 */
import Debug from '../utils/debug';

// Knex configeration
function knexConfig() {
    const app = requireNode('electron').remote.app;
    const path = requireNode('path');
    const homePath = app.getPath('userData');
    const Debugger = new Debug('Bookshelf');

    let filename;

    // Set database filename based on process environment
    if (process.env.debug) {
        filename = path.resolve(homePath, 'EmberElectronSQL_dev.sqlite');
    } else {
        filename = path.resolve(homePath, 'EmberElectronSQL.sqlite');
    }

    // What database file are we using
    Debugger.log(`Using Sqlite databse in ${filename}`);

    return {
        client: 'sqlite3',
        connection: {
            filename
        }
    };
}

// Initialise Knex.js and then Bookshelf.js
const knex = requireNode('knex')(knexConfig());
const bookshelf = requireNode('bookshelf')(knex);

// Export instance
export default bookshelf;