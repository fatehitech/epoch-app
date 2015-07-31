angular.module('controllers.project', [])

.controller('ProjectCtrl', function($scope, Clock, Project) {

  $scope.clock = Clock.build({ sessions: $scope.project.sessions }, $scope.project.uuid);

  $scope.clockedIn = function() {
    return $scope.clock.isOn();
  }
})
