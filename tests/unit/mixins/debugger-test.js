import EmberObject from '@ember/object';
import DebuggerMixin from 'ember-electron-sql/mixins/debugger';
import { module, test } from 'qunit';

module('Unit | Mixin | debugger', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let DebuggerObject = EmberObject.extend(DebuggerMixin);
    let subject = DebuggerObject.create();
    assert.ok(subject);
  });
});
