var moment = require('moment');

angular.module('controllers.project-info', [])

.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
})

.controller('ProjectInfoCtrl', function($stateParams, $scope, Project, Clock) {
  $scope.project = Project.find({ uuid: $stateParams.uuid });
  $scope.clock = Clock.find({ uuid: $scope.project.uuid });

  if ($scope.clock.isOn()) {
    $scope.clock.setInterval(function() {
      $scope.$digest();
    });
  }

  function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  $scope.formatSession = function(session) {
    var diff = null;
    if (session.end) {
      diff = moment(session.end).diff(session.start);
    } else {
      diff = moment().diff(session.start);
    }
    var duration = moment.duration(diff)
    var hours = duration.hours()
    var mins = pad(duration.minutes(), 2)
    var secs = pad(duration.seconds(), 2)
    if (hours > 0) {
      return [hours, mins, secs].join(':')
    } else {
      return [mins, secs].join(':')
    }
  }
})
