angular.module('controllers.new-project', [])

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
