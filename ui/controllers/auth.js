angular.module('controllers.auth', [])

.controller('AuthCtrl', function($scope, $state, session, api) {
  $('.login input[autofocus]').focus();

  $scope.signIn = function() {
    $scope.busy = true;
    $scope.helpStyle = { color: '#333' };
    $scope.helpText = 'Signing in...';
    api.session.create($scope.user, $scope.pass).then(function(res) {
      $scope.helpText = '';
      session.set(res);
      $state.go('dash');
    }).catch(function(err) {
      $scope.helpText = err.message;
      $scope.helpStyle = { color: 'red' }
      session.unset();
    }).finally(function() {
      $scope.busy = false;
      $scope.$apply();
    });
  }
});
