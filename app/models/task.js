/**
 * EMBER DATA MODEL - TASK
 * ID is part of the ember data model, so we don't declar it.
 */
import DS from 'ember-data';

export default DS.Model.extend({
  priority: DS.attr('number'),
  task: DS.attr('string')
});