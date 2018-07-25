# App Mock Up

## Generate ember route

Note: the singular and plaural and captial of the same words. Ember convention.

Generate [ember route](https://guides.emberjs.com/release/routing/) to task
~ ember generate route task

Update routing to to make task the root 

_./app/router.js_
~~~javascript
  const Router = EmberRouter.extend({
    location: config.locationType,
    rootURL: config.rootURL
  });

  Router.map(function() {
+    // Add route '/task' and set to root path '/'
+    this.route('task', { path: '/' });
  });

  export default Router;
~~~

Mock up ember model data

_./app/routes/task.js_
~~~javascript
  import Route from '@ember/routing/route';

  export default Route.extend({
    // Mock-up ember model data
+   model() {
+      return [{
+        id: '1',
+        priority: '3',
+        title: 'Buy bread',
+      }, {
+        id: '2',
+        priority: '1',
+        title: 'Buy milk',
+      }, {
+        id: '4',
+        priority: '0',
+        title: 'Go skiing',
+      }
+      ]},
+  });
~~~

Add some html

./app/templates/task.hbs
~~~html
+  <h1>Tasks</h1>

+  {{! Loop over the model data array, using task as the singular }}
+  {{#each model as |task|}}
+    <li>{{task.title}}</li>
+  {{/each}}

  {{outlet}}
~~~

Let's check everything is working

~ npm start

You can see the task list, awesome!

image 1

## Ember Bootstrap

Let's make things a little pritter and funciontal

Install [Ember Bootstrap](https://www.ember-bootstrap.com/)

Improve the look of our task list

_./app/templates/task.hbs_
~~~html
+  <div class="container">
+    <div class="row">
+      <div class="d-flex col pt-3 pb-3">
+        <h1>TASKS</h1>
+      </div>
+    </div>
+    <div class="row">
+      <div class="d-flex col justify-content-between pb-3">
+        {{input value=newTask size="33"}}
+        {{#bs-button type="outline-primary" }}NEW{{/bs-button}}
+      </div>
+    </div>
+
+    <div class="row">
+      <div class="d-felx col pb-3">
+        <ul class="list-group">
+          {{! Loop over the model data array, using task as the singular }}
+          {{#each model as |task|}}
+            <li class="list-group-item justify-content-between d-flex">
+              <span>{{task.title}}</span>
+              {{#bs-button class="btn-sm" type="danger" }}DELETE{{/bs-button}}
+            </li>
+          {{/each}}
+
+        </ul>
+      </div>
+    </div>
+  </div>

  {{outlet}}
~~~