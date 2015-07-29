var path = require('path');
var ipc = require('ipc');

$ = require('jquery');
angular = require('angular');
require('angular-ui-router');

require('bulk-require')(path.join(__dirname, 'ui'), [
  'services/**/*.js',
  'controllers/**/*.js',
  'factories/**/*.js',
  'filters/**/*.js',
]);

angular.module('app', [
  'ui.router',
  'services.storage',
  'services.session',
  'services.api',
  'services.clock',
  'controllers.auth',
  'controllers.dash',
  'controllers.project',
])

.service('db', function() {
  return require('./db')
})

.run(function($rootScope, session, $state) {
  $rootScope.ipc = function(cmd) {
    ipc.send(cmd);
  }
  $rootScope.destroySession = function() {
    session.unset();
  }
  $rootScope.loggedIn = function() {
    return !!session.get();
  }
})

.constant('apiBase', 'http://localhost:3000')

.config(function($stateProvider, $urlRouterProvider, sessionProvider, apiBase, apiProvider) {

  apiProvider.setServer(apiBase);

  var session = sessionProvider.get();
  if (session) apiProvider.setToken(session.token);

  $stateProvider
  .state('dash', {
    url: '/dash',
    templateUrl: 'ui/templates/dash.html',
  })
  .state('settings', {
    url: '/settings',
    templateUrl: 'ui/templates/settings.html'
  })
  .state('settings.login', {
    url: '/login',
    templateUrl: 'ui/templates/login.html'
  })
  .state('settings.idleTimer', {
    url: '/idle-timer',
    templateUrl: 'ui/templates/idle-timer.html'
  })

  $urlRouterProvider.otherwise('dash');

})
