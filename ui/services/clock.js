var Clock = require('dotclock').Clock;
var _ = require('lodash');
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
    find: function(matcher) {
      return _.find(clocks, matcher);
    },
    stopAll: stopAllClocks,
    build: function(params, uuid) {
      var clock = new Clock();
      var iface = {
        uuid: uuid,
        clearInterval: function() {
          if (iface.interval) clearInterval(iface.interval);
        },
        setInterval: function(cb, ms) {
          iface.clearInterval();
          iface.interval = setInterval(cb, ms);
        },
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
          iface.clearInterval();
        }
      }
      clock.load(params);
      clocks.push(iface)
      return iface;
    }
  }
})
