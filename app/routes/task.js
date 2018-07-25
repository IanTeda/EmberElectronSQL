import Route from '@ember/routing/route';

export default Route.extend({
  // Mock-up ember model data
  model() {
    return [{
      id: '1',
      priority: '3',
      title: 'Buy bread',
    }, {
      id: '2',
      priority: '1',
      title: 'Buy milk',
    }, {
      id: '4',
      priority: '0',
      title: 'Go skiing',
    }
    ]},
});
