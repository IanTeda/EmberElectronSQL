import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Adapter | application', function(hooks) {
  setupTest(hooks);

  // Setup Model and store before testing
  hooks.beforeEach(function() {
  });

  // Release store??
  hooks.afterEach(function() {

  });

  test('it exists', function(assert) {
    let adapter = this.owner.lookup('adapter:application');
    assert.ok(adapter);
  });
});
