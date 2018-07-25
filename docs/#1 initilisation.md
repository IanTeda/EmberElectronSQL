# Scaffolding

## Ember

Scaffold out a new [ember](https://www.emberjs.com/) app
~ ember new EmberElectronSQL

Disable ember-cli google anaylitics

_./ember-cli_
~~~json
-  /**
-    Ember CLI sends analytics information by default. The data is completely
-    anonymous, but there are times when you might want to disable this behavior.
-
-    Setting `disableAnalytics` to true will prevent any data from being sent.
-  */
 {
+  "disableAnalytics": true
 }
~~~

Check everything works
~ cd EmberElectronSQL
~ npm start

Check out [http://localhost:4200/](http://localhost:4200/) in your favourite browser. 

Do you see the ember welcome screen? Awesome it worked and we are off and running.

Image 1

## Electron

Scaffold out [Ember Electron](https://ember-electron.js.org/)

~ ember install ember-electron


Update npm run scripts to start ember electron

_./package.json_
~~~json
"scripts": {
    "build": "ember build",
    "ember": "ember serve",
    "lint:js": "eslint .",
    "start": "ember electron",
    "test": "ember test"
  },
~~~

Check ember electron works

~ npm start

Image 2

## Setup Ember Electron development

Configure ember app for debug

_./config/environment.js_
~~~javascript
  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    ENV.APP.LOG_TRANSITIONS = true;
    ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
  }
~~~

Show devtools

_./ember-electron/main.js_
~~~javascript
// If you want to open up dev tools programmatically, call
mainWindow.openDevTools();
~~~

Remove ember-welcome addon

./package.json
~~~json
  "devDependencies": {
    "babel-plugin-transform-async-to-generator": "^6.24.1",
    "babel-preset-env": "^1.7.0",
    "babel-preset-react": "^6.24.1",
    "broccoli-asset-rev": "^2.7.0",
    "devtron": "^1.4.0",
    "electron-forge": "^5.2.2",
    "electron-prebuilt-compile": "2.0.4",
    "ember-ajax": "^3.0.0",
    "ember-cli": "~3.3.0",
    "ember-cli-app-version": "^3.0.0",
    "ember-cli-babel": "^6.6.0",
    "ember-cli-dependency-checker": "^2.0.0",
    "ember-cli-eslint": "^4.2.1",
    "ember-cli-htmlbars": "^2.0.1",
    "ember-cli-htmlbars-inline-precompile": "^1.0.0",
    "ember-cli-inject-live-reload": "^1.4.1",
    "ember-cli-qunit": "^4.3.2",
    "ember-cli-shims": "^1.2.0",
    "ember-cli-sri": "^2.1.0",
    "ember-cli-uglify": "^2.0.0",
    "ember-data": "~3.3.0",
    "ember-electron": "^2.8.0",
    "ember-export-application-global": "^2.0.0",
    "ember-load-initializers": "^1.1.0",
    "ember-maybe-import-regenerator": "^0.1.6",
    "ember-resolver": "^4.0.0",
    "ember-source": "~3.3.0",
-    "ember-welcome-page": "^3.0.0",
    "eslint-plugin-ember": "^5.0.0",
    "loader.js": "^4.2.3",
    "qunit-dom": "^0.6.2"
  },
~~~


Delete welcome-page template block for application template

_./app/templates/application.hbs_
~~~html
- {{!-- The following component displays Ember's default welcome message. --}}
- {{welcome-page}}
- {{!-- Feel free to remove this! --}}
+ <h1>Application</h1>

 {{outlet}}
~~~

_./ember-electron/main.js_
~~~javascript
 app.on('ready', () => {
+   // Allow process env debug
+   process.env.debug = true;
~~~
