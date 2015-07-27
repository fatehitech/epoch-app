var Client = require('../../api-client');
var Promise = require('bluebird');
angular.module('services.api', [])

.provider('api', function() {
  var client = null;

  this.setServer = function(server) {
    client = new Client(server);
  }

  this.setToken = function(token) {
    client.setToken(token);
  }

  this.$get = function() {
    return client
  }
})
