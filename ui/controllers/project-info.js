angular.module('controllers.project-info', [])

.controller('ProjectInfoCtrl', function($stateParams, $scope, Project, Clock) {
  $scope.project = Project.find({ uuid: $stateParams.uuid });
  $scope.clock = Clock.find({ uuid: $scope.project.uuid });

  if ($scope.clock.isOn()) {
    $scope.clock.setInterval(function() {
      $scope.$digest();
    });
  }
})
