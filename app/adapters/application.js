/**
 * CUSTOM ADAPTER - BOOKSHELF
 * Application adapter will get priority over default Adapter
 * Min overides --> https://emberjs.com/api/ember-data/3.3/classes/DS.Adapter
 */
import DS from 'ember-data';
import Ember from 'ember';
import { pluralize } from 'ember-inflector';

import Bookshelf from '../bookshelf/bookshelf';
import Task from '../bookshelf/task';

// Extend RESTAdapter with database calls
export default DS.RESTAdapter.extend({

  /**
   * Model From Type
   * Return model name based on data type
   * @param {Object} type     Ember data type
   * @param {Object} reject   Promise rejection/error
   */
  _modelFromType(type, reject) {
    const modelName = type.modelName.charAt(0).toUpperCase() + type.modelName.slice(1);

    if (this[modelName]) return this[modelName];
    reject(new Error(`Model ${type.modelName} not found`));
  },

  /**
   * Model To Item
   * 
   * @param {Object} model 
   * @param {Object} name 
   */
  _modelToItem(model, name) {
      return Ember.$.extend(true, {
          type: name
      }, model.attributes);
  },

  /**
   * Pluralise Model Name
   * Add an 's' and underscore to data type
   * @param {Object} type     Ember data type
   */
  _pluralizeModelName(type) {
      return pluralize(type.modelName).underscore();
  },

  /**
   * Am I an object
   * @param {Object} obj 
   */
  _isObject(obj) {
      return obj === Object(obj);
  },

  /**
   * Serialise if Necassary
   * @param {object} data 
   */
  _serializeIfNecessary(data) {
      return data;
  },

  /**
   * BOOKSHELF TO EMBER
   * Turns a bookshelf result into an Ember Data result,
   * resolving the promise for you
   * @param  {Object} result    Bookshelf result
   * @param  {Object} type      Ember Data Type
   * @param  {function} resolve Promise/resolve
   */
  _bookshelfToEmberResult(result, type, resolve) {
      const modelName = this._pluralizeModelName(type);
      const results = {};
      results[modelName] = [];

      result.models.forEach((model) => {
          results[modelName].push(this._modelToItem(model, type.modelName));
      });

      resolve(results);
  },

  // Initialising of Function
  init(){
    this.Bookshelf = Bookshelf;
    this.Task = Task;
  },

  /**
   * FIND ALL
   * Get all records from database
   * @param {Object} store      Ember data store
   * @param {Object} type       Ember data model 
   */
  findAll(store, type) {
    return new Promise((resolve, reject) => {
        const Model = this._modelFromType(type, reject);

        Model
            .fetchAll()
            .then(result => this._bookshelfToEmberResult(result, type, resolve));
    });
  },

  /**
   * CREATE NEW RECORD
   * Write a record to database, then fetch database records.
   * @param {Object} store        Ember data store
   * @param {Object} type         Ember data model
   * @param {Object} snapshot     Ember data store
   */
  createRecord(store, type, snapshot) {
      return new Promise((resolve, reject) => {
          const Model = this._modelFromType(type, reject);
          const result = {};
          const data = this.serialize(snapshot, {
              includeId: true
          });

          new Model(this._serializeIfNecessary(data))
              .save()
              .then((savedModel) => {
                  result[type.modelName] = this._modelToItem(savedModel);
                  resolve(result);
              });
      });
  },

  /**
   * DELETE RECORD
   * Delete a record in the database, then fetch database records.
   * @param {Object} store        Ember data store
   * @param {Object} type         Ember data model
   * @param {Object} snapshot     Ember data store
   */
  deleteRecord(store, type, snapshot) {
      return new Promise((resolve, reject) => {
          const Model = this._modelFromType(type, reject);

          new Model({
              id: snapshot.id
          }).fetch().then((model) => {
              model.destroy().then(() => resolve());
          });
      });
  },

  /**
   * UPDATE RECORD
   * Update record in the database, then fetch database records.
   * @param {Object} store 
   * @param {Object} type 
   * @param {Object} snapshot 
   */
  updateRecord(store, type, snapshot) {
      return new Promise((resolve, reject) => {
          const Model = this._modelFromType(type, reject);
          const result = {};
          const data = this.serialize(snapshot, {
              includeId: true
          });

          new Model({ id: snapshot.id })
              .fetch()
              .then(fetchedModel => {
                  fetchedModel.set(this._serializeIfNecessary(data))
                      .save()
                      .then(savedModel => {
                          result[type.modelName] = this._modelToItem(savedModel);
                          resolve(result);
                      });
              });
      });
  },

  /**
   * QUERY DATABASE
   * Query database and return record of query
   * @param {Object} store        Ember data store
   * @param {Object} type         Ember data model
   * @param {Object} query        Query parameters
   */
  query(store, type, query) {
    return new Promise(resolve => {
        const Model = this._modelFromType(type);

        new Model()
            .query(...query)
            .fetchAll()
            .then(result => this._bookshelfToEmberResult(result, type, resolve));
    });
  }
});
