var uuid = require('uuid');

angular.module('controllers.dash', [])

.factory('Project', function(db) {
  return {
    all: function() {
      return db('projects').map();
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

.controller('DashCtrl', function($scope, Project, Clock, db) {
  $scope.projects = Project.all();

  $scope.newProject = function() {
    $scope.newProject.visible = true;
  }
  $scope.newProject.visible = false;

  $scope.clockIn = function($childScope) {
    $childScope.clock.on()
    db.save();
  }

  $scope.clockOut = function($childScope) {
    $childScope.clock.off()
    db.save();
  }
})

.controller('NewProjectCtrl', function($scope, Project) {
  $scope.form = {};
  $scope.save = function() {
    $scope.$parent.newProject.visible = false;
    Project.insert($scope.form);
    $scope.$parent.projects = Project.all();
    $scope.form = {};
  }
  $scope.close = function(e) {
    e.preventDefault();
    $scope.$parent.newProject.visible = false;
    $scope.form = {};
  }
})
