var uuid = require('uuid');

angular.module('factories.project', [])

.factory('Project', function(db) {
  return {
    all: function() {
      return db('projects').map();
    },
    find: function(finder) {
      return db('projects').find(finder);
    },
    insert: function(_item) {
      var item = db._.extend({},{
        uuid: uuid.v4(),
        sessions: [],
        createdAt: new Date(),
        updatedAt: new Date()
      }, _item);
      db('projects').push(item);
    }
  }
})
