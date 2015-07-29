angular.module('services.session', [])

.provider('session', function(storageProvider) {
  var storage = storageProvider;
  this.set = function(user) {
    storage.set('session', user);
  },
  this.unset = function() {
    storage.unset('session');
  }
  this.get = function(attr) {
    var session = storage.get('session');
    if (session) {
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
