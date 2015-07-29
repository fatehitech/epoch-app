angular.module('controllers.project', [])

.controller('ProjectCtrl', function($scope, Clock, Project) {

  $scope.clock = Clock.build({ sessions: $scope.project.sessions });

  $scope.startTime = null;

  $scope.clockedIn = function() {
    return $scope.clock.isOn();
  }


  var interval = null;

  //$scope.clockIn = function() {
  //  $scope.clock.on()
  //  interval = setInterval(function() {
  //    $scope.$digest();
  //  }, 1000);
  //}

  //$scope.clockOut = function() {
  //  $scope.clock.off()
  //  clearInterval(interval);
  //}
})
