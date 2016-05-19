angular.module('starter')

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})
.controller('DashboardMuridController', function($scope) {})

.controller('SideMenuController', function($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
})
.controller('LoginMenuCtrl', function($scope,$state,$ionicModal,$ionicPopup, $http, AuthService,$ionicLoading, $ionicHistory){
    $scope.data = {};
    $scope.login = function(data){
      $ionicLoading.show({
        template : '<ion-spinner></ion-spinner> <br> Loading'
      });
      AuthService.login(data.email, data.password).then(function(authenticated){
          $ionicLoading.hide();
          $ionicHistory.nextViewOptions({
              disableBack: true
          });
          $state.go('tab.dash');
      }, function(err){
        $ionicLoading.hide();
      })
    }
})
.controller('RegisterMenuCtrl', function($scope,$state,$ionicModal,$ionicPopup, $http, AuthService,$ionicLoading, $ionicHistory){
    $scope.data = {};
    $scope.register = function(data){
      $ionicLoading.show({
        template : '<ion-spinner></ion-spinner> <br> Loading'
      });
      AuthService.register(data.email, data.password, data.confpassword).then(function(authenticated){
          $ionicLoading.hide();
          $ionicHistory.nextViewOptions({
              disableBack: true
          });
          $state.go('tab.dash');
      }, function(err){
        $ionicLoading.hide();
      })
    }
})
.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
