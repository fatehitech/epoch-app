var Clock = require('dotclock').Clock;
var ipc = require('ipc');

angular.module('services.clock', [])

.factory('Clock', function() {
  var clocks = [];
  return {
    stopAll: function() {
      clocks.forEach(function(clock) {
        if (clock.isOn()) clock.getLastSession().end();
      });
    },
    build: function() {
      var sessions = [];
      var clock = new Clock();
      clock.load({ sessions: sessions })
      clocks.push(clock);
      return {
        sessions: function() {
          return sessions;
        },
        isOn: function() {
          return clock.isOn();
        },
        on: function() {
          if (clock.isOn()) return false;
          // open a new session
          clock.openNewSession();
          ipc.send('clockedIn');
        },
        off: function() {
          if (!clock.isOn()) return false;
          var last = clock.getLastSession()
          // close last session by updating keys "end"
          last.end();
          ipc.send('clockedOut');
        }
      }
    }
  }
})
