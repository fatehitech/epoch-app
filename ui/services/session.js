angular.module('services.session', [])

.provider('session', function() {
  this.set = function(user) {
    localStorage.setItem('session', JSON.stringify(user));
  },
  this.unset = function() {
    localStorage.removeItem('session');
  }
  this.get = function(attr) {
    var json = localStorage.getItem('session');
    if (json) {
      var session = JSON.parse(json);
      if (attr) return session[attr];
      return session;
    }
  },
  this.hasRole = function(role) {
    var roles = this.get('roles') || [];
    return ~roles.indexOf(role);
  }
  this.$get = function() {
    return this;
  }
})
