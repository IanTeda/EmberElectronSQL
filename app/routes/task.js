/**
 * TASK ROUTE
 */
import Route from '@ember/routing/route';

export default Route.extend({
  // Get model data for task using ../adapters/application.js
  model() {
    return this.store.findAll('task');
  },
});
