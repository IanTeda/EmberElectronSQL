# Database Setup

Note: We are using [yarn](https://yarnpkg.com/en/) for our [NPM](https://www.npmjs.com/) package manager

## Install SQLITE

Install [sqlite3 npm module](https://www.npmjs.com/package/sqlite3)
~ yarn add sqlite3

Rebuild sqlite3 for using with electron
_./package.json_
~~~json
  "scripts": {
    "build": "ember build",
    "ember": "ember serve",
    "lint:js": "eslint .",
+   "rebuild": "electron-rebuild -f -w sqlite3",
    "start": "ember electron",
    "test": "ember test"
  },
~~~

~ npm run rebuild

## Instakk Knex.js

Install [Knex.js](https://knexjs.org/) npm module. Please note we need to install version [13](http://bookshelfjs.org/#installation) of Knex.js because we plan on using Bookshelf.js in our application

~ yarn add knex@0.13

## Create database in ember-electron

make directory
~ mkdir /ember-electron/database


## Knex Migration

[Migrate](https://knexjs.org/#Migrations) knex database

Create [knexfile.js](https://knexjs.org/#knexfile)

_./ember-electron/database/knexfile.js_
~~~javascript
/*
 * KNEXFILE
 * https://knexjs.org/#knexfile
 * Basic configuration
 ***/
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
~~~

Tell eslint that we are developing in node

./eslintrc.js
~~~javascript
  env: {
    browser: true,
+   es6: true,
+   node: true,
  },
~~~

Create databse migration file

_./ember-electron/database/migrations/20180727_EmberElectronSQL_empty.js_

~~~javascript
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
      table.integer('priority');
      table.string('task');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
      knex.schema.dropTable('tasks'),
  ]);
};
~~~

Add NPM script to build database with Knex.js

_./package.json_
~~~json
  "scripts": {
    "build": "ember build",
    "ember": "ember serve",
    "lint:js": "eslint .",
    "rebuild": "electron-rebuild -f -w sqlite3",
+   "reset:database": "cd ./ember-electron/database && rm ./EmberElectronSQL_empty.sqlite && knex migrate:latest",
    "start": "ember electron",
    "test": "ember test"
  },
~~~

Create an empty sqlite file so the npm run script has something to delete
~ touch ./ember-electron/database/tasks_empty.sqlite

Run npm script to reset database
~ npm run reset:database

Add some default values to the database [DB Browser for SQLite](http://sqlitebrowser.org/)
./ember-electron/database/EmberElectronSQL_empty.sqlite

## Ensure we have a database file

Need to make sure ember-electron has a database file to work with. Before opening the electron window check if one exists in the systems user data folder, if note copy the empty database file

~./ember-electron/database.js
~~~javascript
"use strict";
/**
 * DATABASE 
 * Copy empty databse to system user data location
 */

 /*eslint no-console: ["error", { allow: ["log"] }] */

const app = require('electron').app;
const path = require('path');
const fs = require('fs-extra');

const appPath = app.getPath('userData');
const templatePath = path.join(__dirname, '..', 'ember-electron', 'database', 'tasks_empty.sqlite');
const proDbPath = path.join(appPath, 'tasks.sqlite');
const devDbPath = path.join(appPath, 'tasks_dev.sqlite');

module.exports = {
  // Function to ensure we have a database file to work with
  ensureDatabase() {
      return new Promise((resolve, reject) => {
          // Set SQLite database filename based on process environment
          let dbPath = (process.env.debug) ? devDbPath : proDbPath;

          // Check database file exists
          fs.stat(dbPath, (err) => {
              // If there is an error, the file already exists. Nothing more to do.
              if (!err) {
                  console.log(`SQLite database exists in ${dbPath}`);
                  resolve();

              // Else the database file doesn't exist
              } else {
                  console.log(`SQLite database not found, creating in ${dbPath}`);
                  
                  // Copy empty database file to dbPath
                  fs.copy(templatePath, dbPath, (err) => {

                      // Looks like we couldn't copy the empty database file, opps.
                      if (err) {
                          console.log(err);
                          reject(new Error('Could not create database'));
                      
                      // Awesome! Database file copyed to dpPath.
                      } else {
                          console.log(`SQLite database created in ${dbPath}`);
                          resolve();
                      }
                  });
              }
          });
      });
  }
}
~~~


Ensure database file exists before opening electron browser window

_./ember-electron/main.js_
~~~javascript
+ /*eslint no-console: ["error", { allow: ["log"] }] */
  const { app, BrowserWindow, protocol } = require('electron');
  const { dirname, join, resolve } = require('path');
  const protocolServe = require('electron-protocol-serve');

+ const database = require('./database');

  let mainWindow = null;

  // Registering a protocol & schema to serve our Ember application
  protocol.registerStandardSchemes(['serve'], { secure: true });
  protocolServe({
    cwd: join(__dirname || resolve(dirname('')), '..', 'ember'),
    app,
    protocol,
  });

  // Uncomment the lines below to enable Electron's crash reporter
  // For more information, see http://electron.atom.io/docs/api/crash-reporter/
  // electron.crashReporter.start({
  //     productName: 'YourName',
  //     companyName: 'YourCompany',
  //     submitURL: 'https://your-domain.com/url-to-submit',
  //     autoSubmit: true
  // });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('ready', () => {

    // Give node log messages color
    process.env.debug = true;

+   database.ensureDatabase().then(() => {
      mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
      });

      // If you want to open up dev tools programmatically, call
      mainWindow.openDevTools();

      const emberAppLocation = 'serve://dist';

      // Load the ember application using our custom protocol/scheme
      mainWindow.loadURL(emberAppLocation);

      // If a loading operation goes wrong, we'll send Electron back to
      // Ember App entry point
      mainWindow.webContents.on('did-fail-load', () => {
        mainWindow.loadURL(emberAppLocation);
      });

      mainWindow.webContents.on('crashed', () => {
        console.log('Your Ember app (or other code) in the main window has crashed.');
        console.log('This is a serious issue that needs to be handled and/or debugged.');
      });

      mainWindow.on('unresponsive', () => {
        console.log('Your Ember app (or other code) has made the window unresponsive.');
      });

      mainWindow.on('responsive', () => {
        console.log('The main window has become responsive again.');
      });

      mainWindow.on('closed', () => {
        mainWindow = null;
      });
+   });
  });

  // Handle an unhandled error in the main thread
  //
  // Note that 'uncaughtException' is a crude mechanism for exception handling intended to
  // be used only as a last resort. The event should not be used as an equivalent to
  // "On Error Resume Next". Unhandled exceptions inherently mean that an application is in
  // an undefined state. Attempting to resume application code without properly recovering
  // from the exception can cause additional unforeseen and unpredictable issues.
  //
  // Attempting to resume normally after an uncaught exception can be similar to pulling out
  // of the power cord when upgrading a computer -- nine out of ten times nothing happens -
  // but the 10th time, the system becomes corrupted.
  //
  // The correct use of 'uncaughtException' is to perform synchronous cleanup of allocated
  // resources (e.g. file descriptors, handles, etc) before shutting down the process. It is
  // not safe to resume normal operation after 'uncaughtException'.
  process.on('uncaughtException', (err) => {
    console.log('An exception in the main thread was not handled.');
    console.log('This is a serious issue that needs to be handled and/or debugged.');
    console.log(`Exception: ${err}`);
  });
~~~

Lets give it a go
~ npm start

Check out the terminal for console.log outputs confirming the database has been copied to the Users data folder.