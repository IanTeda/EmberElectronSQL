'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'ember-electron-sql',
    environment,
    rootURL: '/',
    locationType: 'auto',
    // https://github.com/knownasilya/ember-toggle
    'ember-toggle': {
      includedThemes: ['flip'],
      excludedThemes: [''],
      excludeBaseStyles: false, // defaults to false
      defaultShowLabels: false, // defaults to false
      defaultTheme: 'default', // defaults to 'default'
      defaultSize: 'medium', // defaults to 'medium'
      defaultOffLabel: 'false', // defaults to 'Off'
      defaultOnLabel: 'flase', // defaults to 'On'
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    ENV.APP.LOG_TRANSITIONS = true;
    ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
