import Controller from '@ember/controller';

import { Mixin, Debug } from '../mixins/debugger';

export default Controller.extend(Mixin, {

  init() {
    this._super(...arguments);
    this.set('debugger', new Debug('Task Controller'));
},

  actions: {
    addTask() {
      var vat = this.store.createRecord('task',{
        priority: parseFloat(this.get('priority')),
        task: this.get('task'),
      });
      vat.save();
      this.log('Added task \'' + this.get('task') + '\' to database');
    },
    removeTask(task) {
      task.deleteRecord();
      task.save();
      this.log('Removed task \'' + task.task + '\' from database');
    },
  },
});
