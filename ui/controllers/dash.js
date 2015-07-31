angular.module('controllers.dash', [])

.controller('DashCtrl', function($scope, Project, Clock, db) {
  $scope.projects = Project.all();

  $scope.newProject = function() {
    $scope.newProject.visible = true;
  }
  $scope.newProject.visible = false;

  $scope.clockIn = function(project) {
    Clock.find({ uuid: project.uuid }).on();
    project.updatedAt = new Date();
    db.save();
  }

  $scope.clockOut = function(project) {
    Clock.find({ uuid: project.uuid }).off();
    project.updatedAt = new Date();
    db.save();
  }
})
