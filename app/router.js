import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  // Add route '/task' and set to root path '/'
  this.route('task', { path: '/' });
});

export default Router;
