import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model | task', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('task Model exists', function(assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('task', {});
    assert.ok(model);
  });
});
