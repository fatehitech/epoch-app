var path = require('path');
var ipc = require('ipc');

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
  'controllers.auth',
  'controllers.dash',
  'services.session',
  'services.api',
  'services.clock',
])

.run(function($rootScope, session, $state) {
  $rootScope.ipc = function(cmd) {
    ipc.send(cmd);
  }
  $rootScope.destroySession = function() {
    session.unset();
    $state.go('login');
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
  .state('login', {
    url: '/login',
    templateUrl: 'ui/templates/login.html'
  })
  .state('dash', {
    url: '/dash',
    templateUrl: 'ui/templates/dash.html',
  })

  $urlRouterProvider.otherwise('dash');

})
