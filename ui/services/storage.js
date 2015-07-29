angular.module('services.storage', [])

.provider('storage', function() {
  this.set = function(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  this.unset = function(key) {
    localStorage.removeItem(key);
  }
  this.get = function(key) {
    var json = localStorage.getItem(key);
    if (json) return JSON.parse(json);
  },
  this.$get = function() {
    return this;
  }
})
