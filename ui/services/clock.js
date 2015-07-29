var Clock = require('dotclock').Clock;
var ipc = require('ipc');

angular.module('services.clock', [])

.factory('Clock', function() {
  var clocks = [];
  var stopAllClocks = function() {
    clocks.forEach(function(clock) {
      clock.off();
    });
  }
  return {
    build: function(params) {
      var clock = new Clock();
      clock.load(params);
      var iface = {
        sessions: function() {
          return sessions;
        },
        isOn: function() {
          return clock.isOn();
        },
        on: function() {
          stopAllClocks();
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
      clocks.push(iface)
      return iface;
    }
  }
})
