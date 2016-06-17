// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  .state('welcome',{
      url : '/welcome_page',
      templateUrl : 'templates/welcome_page.html',
  })

  .state('login',{
      url : '/login_menu',
      templateUrl : 'templates/login_menu.html',
      controller : 'LoginMenuCtrl'
  })

  .state('register',{
      url : '/register_menu',
      templateUrl : 'templates/register_menu.html',
      controller : 'RegisterMenuCtrl'
  })

  // setup an abstract state for the tabs directive
  .state('murid', {
    url: '/murid',
    abstract: true,
    templateUrl: 'templates/murid.html'
  })

  // Each tab has its own nav history stack:

  .state('murid.dashboard', {
    url: '/dashboard',
    views: {
      'murid-dashboard': {
        templateUrl: 'templates/murid-dashboard.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('murid.daftar', {
      url: '/daftar',
      views: {
        'murid-daftar': {
          templateUrl: 'templates/murid-daftar.html',
          controller: 'DaftarCtrl'
        }
      }
    })

  .state('murid.ujian', {
    url: '/ujian',
    views: {
      'murid-ujian': {
        templateUrl: 'templates/murid-ujian.html',
        controller: 'UjianCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise(function($injector, $location){
      var state = $injector.get('$state');
      state.go('murid.dashboard');
  });
})

.run(function($rootScope, $state, AuthService){
  $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {
    //console.log(AuthService);

    if (!AuthService.isAuthenticated()) {
      if(next.name==='register') {}
      else if(next.name==='welcome') {}
      else if(next.name!=='login') {
        switch(next.name){
          case 'register' : {event.preventDefault();$state.go('register'); break;}
          case 'login' : {event.preventDefault(); $state.go('login'); break;}
          case 'lupapassword' : {event.preventDefault(); $state.go('lupapassword'); break;}
          case 'gantipass/:idUser' : {event.preventDefault(); $state.go('gantipass/:idUser'); break;};
          default : { event.preventDefault(); $state.go('welcome'); break;}
        }
      }
    }
    // } else {
    //     if(!AuthService.isVerified()){
    //       if(next.name==='onestep') {}
    //       else {
    //         event.preventDefault();
    //         $state.go('onestep');
    //       }
    //     }
    //     else {
    //       if(AuthService.user().username.length==0){
    //         if(next.name==='onestepauth') {}
    //         else {
    //           event.preventDefault();
    //           $state.go('onestepauth');
    //         }
    //       }
    //     }
    //     // else {
    //     //   if(AuthService.user().admin){
    //     //     if(next.name==='admin.dash') {}
    //     //     else if(next.name=='admin.nearby') {}
    //     //     else if(next.name=='admin.profile') {}
    //     //     else {
    //     //       event.preventDefault();
    //     //       $state.go('admin.dash');
    //     //     }
    //     //   }
    //     // }
    // }
  });
})
