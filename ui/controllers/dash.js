var Clock = require('dotclock').Clock;
var moment = require('moment');

angular.module('controllers.dash', [])

.controller('DashCtrl', function($scope, session) {
  $scope.sessions = [];
  var clock = new Clock();
  clock.load({ sessions: $scope.sessions })

  $scope.startTime = null;

  $scope.formatSession = function(session) {
    if (session.end) {
      return moment(session.end).diff(session.start);
    } else {
      return moment().diff(session.start);
    }
  }


  var interval = null;

  $scope.clockIn = function() {
    if (clock.isOn()) {
      // throw if session already open
      console.log("You're already clocked in. You must first clock `out`");
    } else {
      // open a new session
      clock.openNewSession();
      console.log('clocked in');
      interval = setInterval(function() {
        $scope.$apply();
      }, 1000);
    }
  }
  $scope.clockOut = function() {
    if (clock.isOn()) {
      var last = clock.getLastSession()
      // close last session by updating keys "end"
      last.end();
      console.log("You clocked out after", last.diff('hours'), 'hours')
      clearInterval(interval);
    } else {
      console.log("Not clocked in")
    }
  }
});
