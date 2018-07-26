# Bookshelf

## Task Model

Generate task model
~ ember generate model task

_./app/bookshelf/routes/task.js_
~~~javascript
/**
 * EMBER DATA MODEL - TASK
 * ID is part of the ember data model, so we don't declar it.
 */
import DS from 'ember-data';

export default DS.Model.extend({
  priority: DS.attr('number'),
  task: DS.attr('string')
});
~~~

## Debug Utility

Utility to help with debugging

_./app/utils/debug.js_
~~~javascript
/**
 * DEBUG UTIL
 * Utility to help with debugging
 */
export default class Debug {
  constructor(name) {
      this.name = name;
      this.color = this._createColor();
      this.padLength = 18;
      this.timerStore = [];
  }

  /**
   * Logs some content in a pretty fromat
   * @param  {string} content - Content to log
   */
  log(content) {
      if (!process.env.debug) return;

      const colorString = `color: ${this.color}; font-weight: bold;`;
      const name = this.name.slice(0, this.padLength);
      const titleContent = Array(this.padLength + 3 - this.name.length).join(' ');
      const title = `%c${name}${titleContent}|`;

      console.log(title, colorString, content); // eslint-disable-line no-console
  }

  /**
   * Ends a console timer with a given name
   * @param  {string} name - Name of the timer
   */
  timeEnd(name) {
      const start = Date.now();
      let foundIndex;

      const runningTimer = this.timerStore.find((item, index) => {
          if (item.name === name) {
              foundIndex = index;
              return true;
          }
      });

      if (runningTimer) {
          this.timerStore.splice(foundIndex, 1);
          this.log(`${name} took ${start - runningTimer.start}ms`);
      }
  }

  /**
   * Start a console timer with a given name
   * @param  {string} name - Name of the timer
   */
  time(name) {
      this.timerStore.push({ start: Date.now(), name });
  }

  _createColor() {
      const h = this._random(1, 360);
      const s = this._random(60, 100);
      const l = this._random(0, 50);
      return `hsl(${h}, ${s}%, ${l}%)`;
  }

  _random(min, max) {
      return min + Math.random() * (max - min);
  }
}
~~~

## Bookshelf

Install bookshelf
~ yarn add bookshelf

Bookshelf setup
_./app/bookshelf/bookshelf.js_
~~~javascript
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
~~~

Update .eslintrc.js to ignore requireNode

_./.eslintrc.js_
~~~javascript
globals: {
    requireNode: false,
  },
~~~
