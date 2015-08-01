var moment = require('moment');

angular.module('filters.normalize-sessions', [])

.filter('normalizeSessions', function() {
  function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }
  function duration(session) {
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
  return function(sessions) {
    return sessions.map(function(s) {
      s.start = new Date(s.start);
      s.duration = duration(s);
      if (s.end) s.end = new Date(s.end);
      return s
    });
  }
})
