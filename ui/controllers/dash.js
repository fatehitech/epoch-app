var db = require('../../db');

angular.module('controllers.dash', [])

.factory('Project', function() {
  return {
    all: function() {
      return db('projects').cloneDeep();
    },
    insert: function(item) {
      db._.extend(item, {
        id: db('projects').size()+1,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      db('projects').push(item);
    }
  }
})

.controller('DashCtrl', function($scope, Project) {
  $scope.projects = Project.all();

  $scope.newProject = function() {
    $scope.newProject.visible = true;
  }
  $scope.newProject.visible = false;
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
  }
})
