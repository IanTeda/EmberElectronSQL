# Scaffolding

## Ember

Scaffold out a new [ember](https://www.emberjs.com/) app
~ ember new EmberElectronSQL

Disable ember-cli google anaylitics

_./ember-cli_
~~~ json 

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

~~~ javascript

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
