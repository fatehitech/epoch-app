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
  'filters.normalize-sessions',
  'filters.reverse',
  'filters.date',
  'factories.project',
  'services.storage',
  'services.session',
  'services.api',
  'services.clock',
  'controllers.auth',
  'controllers.dash',
  'controllers.project',
  'controllers.new-project',
  'controllers.project-info',
])

.service('db', function() {
  return require('./db')
})

.run(function($rootScope, session, $state, Clock, db) {
  window.onbeforeunload = function() {
    Clock.stopAll();
    db.saveSync();
    return true;
  }
  $rootScope.toggleDevTools = function(cmd) {
    ipc.send('toggleDevTools');
  }
  $rootScope.quitApp = function() {
    ipc.send('terminate');
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
  .state('projectInfo', {
    url: '/project/{uuid}/info',
    templateUrl: 'ui/templates/project-info.html'
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
