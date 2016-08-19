angular.module('starter')

.service('AuthService', function($q, $http, $ionicPopup) {
  var LOCAL_TOKEN_KEY = 'yourTokenKey';
  var user;
  var isAuthenticated = false;
  var role = '';
  var authToken;
  var server_url = 'http://temanisbaru.herokuapp.com';

  function loadUserCredentials() {
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
    if (token) {
      var x = JSON.parse(token);
      useCredentials(x);
    }
  }

  function storeUserCredentials(token) {
    window.localStorage.setItem(LOCAL_TOKEN_KEY, JSON.stringify(token));
    useCredentials(token);
  }

  function useCredentials(token) {
    user = token;
    isAuthenticated = true;
    authToken = token;
    // Set the token as header for your requests!
    //$http.defaults.headers.common['X-Auth-Token'] = JSON.stringify(token);
    //console.log($http.defaults.headers.common['X-Auth-Token']);
  }

  function destroyUserCredentials() {
    authToken = undefined;
    user = '';
    isAuthenticated = false;
    //$http.defaults.headers.common['X-Auth-Token'] = undefined;
    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
  }
  // var loginFB = function(id){
  //   return $q(function(resolve, reject) {
  //     var url = 'http://octopus.id/api/loginFB?id='+id;
  //     $http.get(url).then(function(resp) {
  //       //console.log('Success', resp);
  //       if(resp.data.code!=200){
  //           var alertPopup = $ionicPopup.alert({
  //               title : 'Login Failed',
  //               template : resp.data.message
  //           });
  //           reject('Login Failed.');
  //       } else {
  //           storeUserCredentials(resp.data.user);
  //           resolve('Login success.');
  //       }
  //       // For JSON responses, resp.data contains the result
  //     }, function(err) {
  //       // console.error('ERR', err);
  //       reject('Login Failed.');
  //       // err.status will contain the status code
  //     })
  //     // if ((name == 'admin' && pw == '1') || (name == 'user' && pw == '1')) {
  //     //   // Make a request and receive your auth token from your server
  //     //   storeUserCredentials(name + '.yourServerToken');
  //     //   resolve('Login success.');
  //     // } else {
  //     //   reject('Login Failed.');
  //     // }
  //   });
  // };

  var register = function(email, pw, confpw) {
    return $q(function(resolve, reject) {
      var url = server_url + '/api/register?email='+email+'&password='+pw+'&passwordconfirmation='+confpw;
      $http.get(url).then(function(resp) {
        if(resp.data.code != 200){
          var alertPopup = $ionicPopup.alert({
            title : 'Register Failed',
            template : resp.data.message
          });
          reject('Register Failed');
        } else {
          storeUserCredentials(resp.data.user);
          resolve('Register Success');
        }
      }, function(err){
        reject('Register Failed');
      })
    });
  };

  var login = function(name, pw) {
    return $q(function(resolve, reject) {
      var url = server_url + '/api/login?email='+name+'&password='+pw;
      $http.get(url).then(function(resp) {
        if(resp.data.code!=200){
            var alertPopup = $ionicPopup.alert({
                title : 'Login Failed',
                template : resp.data.message
            });
            reject('Login Failed.');
        } else {
            storeUserCredentials(resp.data.user);
            resolve('Login success.');
        }
      }, function(err) {
        reject('Login Failed.');
      })
    });
  };

  var cekemail = function(name) {
    return $q(function(resolve, reject) {
      var url = server_url + '/api/cekemail?email='+name;
      $http.get(url).then(function(resp) {
        if(resp.data.code!=200){
            var alertPopup = $ionicPopup.alert({
                title : 'Link Gagal Dikirim',
                template : resp.data.message
            });
            reject('Reset Failed.');
        } else {
            var alertPopup = $ionicPopup.alert({
              title : 'Link Terkirim',
              template : resp.data.message
            });
            resolve('Reset Success.');
        }
      }, function(err) {
        reject('Reset Failed.');
      })
    });
  };

  var logout = function() {
    destroyUserCredentials();
  };


  loadUserCredentials();

  return {
    login: login,
    logout : logout,
    register : register,
    isAuthenticated: function() {return isAuthenticated;},
    user : function() {return user;},
    role: function() {return role;},
    isVerified : function(){return user.verification;},
    changeVerified : function(obj){
      window.localStorage.removeItem(LOCAL_TOKEN_KEY);
      user.verification = true;
      user.image = obj.image;
      user.gender = obj.gender;
      user.date_birth = obj.date_birth;
      storeUserCredentials(user);
    },
    changeProfile : function(obj){
      window.localStorage.removeItem(LOCAL_TOKEN_KEY);
      user.image = obj.image;
      user.gender = obj.gender;
      user.date_birth = obj.date_birth;
      user.phone = obj.phone;
      user.email = obj.email;
      storeUserCredentials(user);
    },
    changeOauth: function(obj){
      window.localStorage.removeItem(LOCAL_TOKEN_KEY);
      user.username = obj.username;
      user.date_birth = obj.date_birth;
      user.phone = obj.phone;
      user.qr_code = obj.qr_code;
      storeUserCredentials(user);
    },
    changePhone: function(newobj){
      window.localStorage.removeItem(LOCAL_TOKEN_KEY);
      user.phone = newobj.phone;
      storeUserCredentials(user);
    }
  };
})

