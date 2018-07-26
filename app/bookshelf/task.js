/**
 * TASK BOOKSHELF MODEL
 * http://bookshelfjs.org/#examples
 * Setup bookshelf model for task
 */
import bookshelf from './bookshelf';

export default bookshelf.Model.extend({
  tableName: 'tasks', // Note the plural
});