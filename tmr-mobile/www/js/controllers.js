angular.module('starter')

.controller('DashCtrl', function($scope, AuthService,$ionicLoading,$ionicHistory,$state,$timeout) {
    var user = AuthService.user();
    $scope.user = user;
    $scope.logout = function(){
      $ionicLoading.show({
        template : '<ion-spinner></ion-spinner> <br> Loading'
      });
      AuthService.logout();
      $ionicLoading.hide();
      $timeout(function(){
        $ionicHistory.clearCache();
        $ionicHistory.clearHistory();
      },1000)
      $state.go('welcome');
    }
})

.controller('AppCtrl', function($scope, AuthService,$ionicLoading,$ionicHistory,$state,$timeout, $ionicModal, $http) {
  $ionicModal.fromTemplateUrl('templates/modal_profil.html', {
    id: '1',
    scope: $scope,
    backdropClickToClose: false,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.oModal1 = modal;
    var user = AuthService.user();
    $scope.user = user;
    var tgllahir, day, month, year;
    if (user.datebirth != null){
      tgllahir = new Date(user.datebirth);
      day = new Date(user.datebirth).getDate();
      month = new Date(user.datebirth).getMonth();
      year = new Date(user.datebirth).getFullYear();
    }
    $scope.tgllahir = tgllahir;
    $scope.day = day;
    $scope.month = month;
    $scope.year = year;
    $scope.send = function(data, tgllahir){
      data.id_user = AuthService.user().id;
      tgl = new Date(tgllahir);
      data.day = tgl.getDate();
      data.month = tgl.getMonth()+1;
      data.year = tgl.getFullYear();
      // console.log(data);
      $http.post('http://localhost:1337/api/applyprofile', data)
      .success(function(datas){
        $scope.oModal1.hide();
      })
    }
  });

  $ionicModal.fromTemplateUrl('templates/modal_tingkatan.html',{
    id: '2',
    scope: $scope,
    backdropClickToClose: false,
    animation: 'slide-in-up'
  }).then(function(modal){
    $scope.oModal2 = modal;
    var user = AuthService.user();
  });

  $ionicModal.fromTemplateUrl('templates/modal_dokumen.html',{
    id: '3',
    scope: $scope,
    backdropClickToClose: false,
    animation: 'slide-in-up'
  }).then(function(modal){
    $scope.oModal3 = modal;
    var user = AuthService.user();
  });

  $scope.openModal = function(index) {
    if (index == 1) $scope.oModal1.show();
    if (index == 2) $scope.oModal2.show();
    if (index == 3) $scope.oModal3.show();
  };

  $scope.closeModal = function(index) {
    if (index == 1) $scope.oModal1.hide();
    if (index == 2) $scope.oModal2.hide();
    if (index == 3) $scope.oModal3.hide();
  };
  
})

.controller('DaftarCtrl', function($scope, $http, $ionicLoading, $state) {
    $scope.message = "";
    $scope.show = true;
    $http.get('http://localhost:1337/api/verifyapplication')
    .success(function(datas){
        if(datas.code!=200){
            $scope.message = datas.message;
            $scope.show = false;
        } else {
            $scope.message  = datas.message;
            $scope.show = true;
        }
    })
    .error(function(err){

    })
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
          if (data.email != "admin@temanis.com"){
            $state.go('murid.dashboard');
          }
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
          $state.go('murid.dashboard');
      }, function(err){
        $ionicLoading.hide();
      })
    }
})

.controller('UjianCtrl', function($scope, AuthService,$ionicLoading,$ionicHistory,$state,$timeout) {
  var user = AuthService.user();
  var usm = "";
  $scope.user = user;
  if (user.testdate != null) {
    var date = new Date(user.testdate);
    console.log(date.getDay())
    if (date.getDay() == 1) {
        usm += "Senin, ";
    } else if (date.getDay() == 2) {
        usm += "Selasa, "; 
    } else if (date.getDay() == 3) {
        usm += "Rabu, ";
    } else if (date.getDay() == 4) {
        usm += "Kamis, ";
    } else if (date.getDay() == 5) {
        usm += "Jumat, "; 
    } else if (date.getDay() == 6) {
        usm += "Sabtu, "; 
    }
    usm += date.getDate() + " "; 
    if (date.getMonth() == 0) {
        usm += "Januari "; 
    } else if (date.getMonth() == 1) {
        usm += "Februari ";
    } else if (date.getMonth() == 2) {
        usm += "Maret ";
    } else if (date.getMonth() == 3) {
        usm += "April ";
    } else if (date.getMonth() == 4) {
        usm += "Mei ";
    } else if (date.getMonth() == 5) {
        usm += "Juni ";
    } else if (date.getMonth() == 6) {
        usm += "Juli ";
    } else if (date.getMonth() == 7) {
        usm += "Agustus ";
    } else if (date.getMonth() == 8) {
        usm += "September ";
    } else if (date.getMonth() == 9) {
        usm += "Oktober ";
    } else if (date.getMonth() == 10) {
        usm += "November ";
    } else if (date.getMonth() == 11) {
        usm += "Desember ";
    }
    usm += date.getFullYear();    
  } else {
      usm = "-";
  }
  $scope.usm = usm;
})

