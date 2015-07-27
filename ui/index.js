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
  'ui.controllers.auth',
  'services.session',
  'services.api',
])

.run(function($rootScope) {
  $rootScope.ipc = function(cmd) {
    ipc.send(cmd);
  }
})

.constant('apiBase', 'http://localhost:3000')

.config(function($stateProvider, $urlRouterProvider, sessionProvider, apiBase, apiProvider) {

  apiProvider.setServer(apiBase);

  var session = sessionProvider.get();

  $stateProvider
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html'
  })
  .state('init', {
    url: '/init',
    templateUrl: 'templates/init.html'
  })
  .state('dash', {
    url: '/dash',
    templateUrl: 'templates/dash.html'
  })

  if (session) { 
    apiProvider.setToken(session.token);
    console.log(session.token);
    $urlRouterProvider.otherwise('init');
  } else {
    $urlRouterProvider.otherwise('login');
  }

})
