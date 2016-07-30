angular.module('starter')

.controller('DashCtrl', function($scope, AuthService,$ionicLoading,$ionicHistory,$state,$timeout) {
    var user = AuthService.user();
    var stropendate = "";
    var strclosedate = "";
    $scope.user = user;

    var opendate = new Date(user.opendate);
    stropendate += opendate.getDate() + " ";
    if (opendate.getMonth() == 0) {
        stropendate += "Januari "; 
    } else if (opendate.getMonth() == 1) {
        stropendate += "Februari ";
    } else if (opendate.getMonth() == 2) {
        stropendate += "Maret ";
    } else if (opendate.getMonth() == 3) {
        stropendate += "April ";
    } else if (opendate.getMonth() == 4) {
        stropendate += "Mei ";
    } else if (opendate.getMonth() == 5) {
        stropendate += "Juni ";
    } else if (opendate.getMonth() == 6) {
        stropendate += "Juli ";
    } else if (opendate.getMonth() == 7) {
        stropendate += "Agustus ";
    } else if (opendate.getMonth() == 8) {
        stropendate += "September ";
    } else if (opendate.getMonth() == 9) {
        stropendate += "Oktober ";
    } else if (opendate.getMonth() == 10) {
        stropendate += "November ";
    } else if (opendate.getMonth() == 11) {
        stropendate += "Desember ";
    }
    stropendate += opendate.getFullYear(); 
    $scope.stropendate = stropendate;

    var closedate = new Date(user.closedate);
    strclosedate += closedate.getDate() + " ";
    if (closedate.getMonth() == 0) {
        strclosedate += "Januari "; 
    } else if (closedate.getMonth() == 1) {
        strclosedate += "Februari ";
    } else if (closedate.getMonth() == 2) {
        strclosedate += "Maret ";
    } else if (closedate.getMonth() == 3) {
        strclosedate += "April ";
    } else if (closedate.getMonth() == 4) {
        strclosedate += "Mei ";
    } else if (closedate.getMonth() == 5) {
        strclosedate += "Juni ";
    } else if (closedate.getMonth() == 6) {
        strclosedate += "Juli ";
    } else if (closedate.getMonth() == 7) {
        strclosedate += "Agustus ";
    } else if (closedate.getMonth() == 8) {
        strclosedate += "September ";
    } else if (closedate.getMonth() == 9) {
        strclosedate += "Oktober ";
    } else if (closedate.getMonth() == 10) {
        strclosedate += "November ";
    } else if (closedate.getMonth() == 11) {
        strclosedate += "Desember ";
    }
    strclosedate += closedate.getFullYear(); 
    $scope.strclosedate = strclosedate;
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

.controller('AppCtrl', function($scope, AuthService,$cordovaImagePicker,$ionicLoading,$ionicHistory,$state,$timeout, $ionicModal, $http, $ionicPopup) {
  $scope.openfile1 = function(){
    var options = {
     maximumImagesCount: 1,
     width: 800,
     height: 800,
     quality: 80
    };
    // var LOCAL_IMAGE_1 = "myImage1";

    $cordovaImagePicker.getPictures(options)
      .then(function (results) {
        window.plugins.Base64.encodeFile(results[0], function(base64){
          // console.log(base64);
          var tmp = results[0];
          $scope.filename1 = tmp.replace("file:///data/data/com.ionicframework.tmrmobile648571/cache/tmp_", "");
          $scope.file_1 = base64.replace("data:image/*;charset=utf-8", "data:image/jpeg");
        });
      }, function(error) {
        // error getting photos
    });
  }
  $scope.openfile2 = function(){
    var options = {
     maximumImagesCount: 1,
     width: 800,
     height: 800,
     quality: 80
    };

    $cordovaImagePicker.getPictures(options)
      .then(function (results) {
        window.plugins.Base64.encodeFile(results[0], function(base64){
          var tmp = results[0];
          $scope.filename2 = tmp.replace("file:///data/data/com.ionicframework.tmrmobile648571/cache/tmp_", "");
          $scope.file_2 = base64.replace("data:image/*;charset=utf-8", "data:image/jpeg");
        });
      }, function(error) {
        // error getting photos
    });
  }
  $scope.openfile3 = function(){
    var options = {
     maximumImagesCount: 1,
     width: 800,
     height: 800,
     quality: 80
    };

    $cordovaImagePicker.getPictures(options)
      .then(function (results) {
        window.plugins.Base64.encodeFile(results[0], function(base64){
          // console.log(results[0]);
          var tmp = results[0];
          $scope.filename3 = tmp.replace("file:///data/data/com.ionicframework.tmrmobile648571/cache/tmp_", "");
          // console.log($scope.filename3);
          $scope.file_3 = base64.replace("data:image/*;charset=utf-8", "data:image/jpeg");
        });
      }, function(error) {
        // error getting photos
    });
  }
  $scope.openfile4 = function(){
    var options = {
     maximumImagesCount: 1,
     width: 800,
     height: 800,
     quality: 80
    };

    $cordovaImagePicker.getPictures(options)
      .then(function (results) {
        window.plugins.Base64.encodeFile(results[0], function(base64){
          var tmp = results[0];
          $scope.filename4 = tmp.replace("file:///data/data/com.ionicframework.tmrmobile648571/cache/tmp_", "");
          $scope.file_4 = base64.replace("data:image/*;charset=utf-8", "data:image/jpeg");
        });
      }, function(error) {
        // error getting photos
    });
  }
  $ionicModal.fromTemplateUrl('templates/modal_profil.html', {
    id: '1',
    scope: $scope,
    backdropClickToClose: false,
    animation: 'slide-in-up'
  }).then(function(modal) {
    var server_url = 'http://temanisbaru.herokuapp.com';
    $scope.oModal1 = modal;
    var user = AuthService.user();
    $scope.user = user;
    // var tgllahir, day, month, year;
    // if (user.datebirth != null){
    //   tgllahir = new Date(user.datebirth);
    //   // day = new Date(user.datebirth).getDate();
    //   // month = new Date(user.datebirth).getMonth();
    //   // year = new Date(user.datebirth).getFullYear();
    // }
    // $scope.tgllahir = tgllahir;
    // $scope.day = day;
    // $scope.month = month;
    // $scope.year = year;
    $scope.send_profil = function(data, tgl){
      data.id_user = AuthService.user().id;
      var _tgl = new Date(tgl);
      data.day = _tgl.getDate();
      data.month = _tgl.getMonth();
      data.year = _tgl.getFullYear();
      // $http.post('http://localhost:1337/api/applyprofile', data)
      // .success(function(datas){
      //   $scope.oModal1.hide();
      // })
      var url = server_url + '/api/applyprofile';
      $http.post(url, data).then(function(resp) {
        if(resp.data.code != 200){
          var alertPopup = $ionicPopup.alert({
            title : 'Pendaftaran Gagal.',
            template : resp.data.message
          });
        } else {
          $scope.oModal1.hide();
        }
      }, function(err){
        
      })
      // $http.post(server_url + '/api/applyprofile', data)
      // .success(function(datas){
      //   $scope.oModal1.hide();
      // })
    }
  });

  $ionicModal.fromTemplateUrl('templates/modal_tingkatan.html',{
    id: '2',
    scope: $scope,
    backdropClickToClose: false,
    animation: 'slide-in-up'
  }).then(function(modal){
    var server_url = 'http://temanisbaru.herokuapp.com';
    $scope.oModal2 = modal;
    var user = AuthService.user();
    $scope.user = user;
    $scope.send_tingkatan = function(data){
      data.id_user = AuthService.user().id;
      // $http.post('http://localhost:1337/api/applygrade', data)
      // .success(function(datas){
      //   $scope.oModal2.hide();
      // })
      $http.post(server_url + '/api/applygrade', data)
      .success(function(datas){
        $scope.oModal2.hide();
      })
    }
  });

  $ionicModal.fromTemplateUrl('templates/modal_dokumen.html',{
    id: '3',
    scope: $scope,
    backdropClickToClose: false,
    animation: 'slide-in-up'
  }).then(function(modal){
    var server_url = 'http://temanisbaru.herokuapp.com';
    $scope.data = {};
    $scope.oModal3 = modal;
    var user = AuthService.user();
    $scope.user = user;
    if (typeof($scope.file_1) == "undefined"){
      if (user.documents_status == 1){
        $scope.file_1 = user.files[0].url;
      }
    }
    if (typeof($scope.filename1) == "undefined"){
      if (user.documents_status == 1){
        $scope.filename1 = user.files[0].name;
      }
    }
    if (typeof($scope.file_2) == "undefined"){
      if (user.documents_status == 1){
        $scope.file_2 = user.files[1].url;
      }
    }
    if (typeof($scope.filename2) == "undefined"){
      if (user.documents_status == 1){
        $scope.filename2 = user.files[1].name;
      }
    }
    if (typeof($scope.file_3) == "undefined"){
      if (user.documents_status == 1){
        $scope.file_3 = user.files[2].url;
      }
    }
    if (typeof($scope.filename3) == "undefined"){
      if (user.documents_status == 1){
        $scope.filename3 = user.files[2].name;
      }
    }
    if (typeof($scope.file_4) == "undefined"){
      if (user.documents_status == 1){
        $scope.file_4 = user.files[3].url;
      }
    }
    if (typeof($scope.filename4) == "undefined"){
      if (user.documents_status == 1){
        $scope.filename4 = user.files[3].name;
      }
    }
    $scope.send_dokumen = function(data){
      console.log($scope.file_1);
      console.log($scope.file_2);
      console.log($scope.file_3);
      console.log($scope.file_4);
      if (typeof($scope.filename1) == "undefined"){
        // console.log('yes');
        var alertPopup = $ionicPopup.alert({
          title : 'Upload Gagal',
          template : "Anda harus mengupload akte lahir Anda."
        });
        return;
      }
      if (typeof($scope.filename2) == "undefined"){
        // console.log('yes');
        var alertPopup = $ionicPopup.alert({
          title : 'Upload Gagal',
          template : "Anda harus mengupload ijazah Anda."
        });
        return;
      }
      if (typeof($scope.filename3) == "undefined"){
        // console.log('yes');
        var alertPopup = $ionicPopup.alert({
          title : 'Upload Gagal',
          template : "Anda harus mengupload pas foto Anda."
        });
        return;
      }
      if (typeof($scope.filename4) == "undefined"){
        // console.log('yes');
        var alertPopup = $ionicPopup.alert({
          title : 'Upload Gagal',
          template : "Anda harus mengupload rapor terakhir Anda."
        });
        return;
      }
      data.files = [];
      data.files[0] = {name : $scope.filename1, url : $scope.file_1};
      data.files[1] = {name : $scope.filename2, url : $scope.file_2};
      data.files[2] = {name : $scope.filename3, url : $scope.file_3};
      data.files[3] = {name : $scope.filename4, url : $scope.file_4};
      console.log(data.files);
      // _user.files = files;
      // _user.documents_status = 1;
      // _user.verifyremarks = "Harap Menyerahkan Dokumen Asli Ke Sekolah Sebelum Pendaftaran Ditutup.";
      // console.log(_user);
      // $scope.oModal3.hide();
      data.id_user = AuthService.user().id;
      // data.files = files;
      // data.file1 = $scope.file_1;
      // data.file2 = $scope.file_2;
      // data.file3 = $scope.file_3;
      // data.file4 = $scope.file_4;
      // // data.files[0].url = $scope.file_1;
      // // data.files[1].url = $scope.file_2;
      // // data.files[2].url = $scope.file_3;
      // // data.files[3].url = $scope.file_4;
      // console.log(data);
      // $http.post('http://localhost:1337/api/applydocuments', data)
      // .success(function(datas){
      //   $scope.oModal3.hide();
      // })
      $http.post(server_url + '/api/applydocuments', data)
      .success(function(datas){
        $scope.oModal3.hide();
      })
    }
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
    var server_url = 'http://temanisbaru.herokuapp.com';
    $scope.message = "";
    $scope.show = true;
    // $http.get('http://localhost:1337/api/verifyapplication')
    // .success(function(datas){
    //     if(datas.code!=200){
    //         $scope.message = datas.message;
    //         $scope.show = false;
    //     } else {
    //         $scope.message  = datas.message;
    //         $scope.show = true;
    //     }
    // })
    // .error(function(err){

    // })
    $http.get(server_url + '/api/verifyapplication')
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

