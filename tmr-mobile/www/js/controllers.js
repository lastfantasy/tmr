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

.controller('AppCtrl', function($scope, AuthService,$ionicLoading,$ionicHistory,$state,$timeout, $ionicModal) {
  $ionicModal.fromTemplateUrl('templates/modal-1.html', {
    id: '1',
    scope: $scope,
    backdropClickToClose: false,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.oModal1 = modal;
    var user = AuthService.user();
    $scope.user = user;
    var name = "";
    if (user.name != null){
      name = user.name;
    }
    $scope.name = name;
    var alamat = "";
    if (user.address != null){
      alamat = user.address;
    }
    $scope.alamat = alamat;
    var tempatlahir = "";
    if (user.placebirth != null){
      tempatlahir = user.placebirth;
    }
    $scope.tempatlahir = tempatlahir;
    var tgllahir;
    if (user.datebirth != null){
      tgllahir = new Date(user.datebirth);
    }
    $scope.tgllahir = tgllahir;
    var gender = "m";
    if (user.gender == "f"){
      gender = "f";
    }
    $scope.gender = gender;
    var telp = "";
    if (user.phone != null){
      telp = user.phone;
    }
    $scope.telp = telp;
    var hp = "";
    if (user.handphone != null){
      hp = user.handphone;
    }
    $scope.hp = hp;
    var namaayah = "";
    if (user.fathername != null){
      namaayah = user.fathername;
    }
    $scope.namaayah = namaayah;
    var pekayah = "";
    if (user.fatheroccupation != null){
      pekayah = user.fatheroccupation;
    }
    $scope.pekayah = pekayah;
    var penghayah = "";
    if (user.fathersalary != null){
      penghayah = user.fathersalary;
    }
    $scope.penghayah = penghayah;
    var telpayah = "";
    if (user.fatherphone != null){
      telpayah = user.fatherphone;
    }
    $scope.telpayah = telpayah;
    var namaibu = "";
    if (user.mothername != null){
      namaibu = user.mothername;
    }
    $scope.namaibu = namaibu;
    var pekibu = "";
    if (user.motheroccupation != null){
      pekibu = user.motheroccupation;
    }
    $scope.pekibu = pekibu;
    var penghibu = "";
    if (user.mothersalary != null){
      penghibu = user.mothersalary;
    }
    $scope.penghibu = penghibu;
    var telpibu = "";
    if (user.motherphone != null){
      telpibu = user.motherphone;
    }
    $scope.telpibu = telpibu;
    var saudara = "";
    if (user.numbersiblings != null){
      saudara = user.numbersiblings;
    }
    $scope.saudara = saudara;
  });

  $ionicModal.fromTemplateUrl('modal-2.html',{
    id: '2',
    scope: $scope,
    backdropClickToClose: false,
    animation: 'slide-in-up'
  }).then(function(modal){
    $scope.oModal2 = modal;
    var user = AuthService.user();
  });

  $ionicModal.fromTemplateUrl('modal3.html',{
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
    else $scope.oModal2.show();
  };

  $scope.closeModal = function(index) {
    if (index == 1) $scope.oModal1.hide();
    else $scope.oModal2.hide();
  };
  
})

.controller('DaftarCtrl', function($scope, $http, $ionicLoading, $state) {
    var obj = {};
    $scope.message = "";
    $http.post('http://localhost:1337/api/verifyapplication',obj)
    .success(function(datas){
        if(datas.code!=200){
            $scope.message = datas.message;
        } else {
            $scope.message  = datas.message;
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

