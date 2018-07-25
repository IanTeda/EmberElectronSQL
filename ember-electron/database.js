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
const templatePath = path.join(__dirname, '..', 'ember-electron', 'database', 'EmberElectronSQL_empty.sqlite');
const proDbPath = path.join(appPath, 'EmberElectronSQL.sqlite');
const devDbPath = path.join(appPath, 'EmberElectronSQL_dev.sqlite');

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