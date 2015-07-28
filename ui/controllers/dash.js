var Clock = require('dotclock').Clock;
var moment = require('moment');
var ipc = require('ipc');

angular.module('controllers.dash', [])

.controller('DashCtrl', function($scope, session) {
  $scope.sessions = [];
  var clock = new Clock();
  clock.load({ sessions: $scope.sessions })

  $scope.startTime = null;

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

  var interval = null;

  $scope.clockIn = function() {
    if (!clock.isOn()) {
      // open a new session
      clock.openNewSession();
      ipc.send('clockedIn');
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
      clearInterval(interval);
      ipc.send('clockedOut');
    }
  }
});
