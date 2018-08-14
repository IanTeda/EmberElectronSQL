import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';
import { Mixin, Debug } from '../mixins/debugger';

export default Controller.extend(Mixin, {

  // Alias the model so templates are easier to read
  tasks: alias('model'),

  init() {
    this._super(...arguments);
    this.set('debugger', new Debug('Task Controller'));
  },

  actions: {
    addTask() {
      var vat = this.store.createRecord('task',{
        priority: parseFloat(this.get('priority')),
        name: this.get('name'),
      });
      vat.save();
      this.log('Added task \'' + this.get('name') + '\' to database');
    },
    removeTask(task) {
      task.deleteRecord();
      task.save();
      this.log('Removed task \'' + task.name + '\' from database');
    },
    markCompleted(task){
      task.set('isCompleted', true);
      task.save();
      this.log('Task \'' + task.name + '\' marked as completed');
    },
    markNotCompleted(task){
      task.set('isCompleted', false);
      task.save();
      this.log('Task \'' + task.name + '\' marked as not completed');
    }
  },
});
