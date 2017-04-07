var app = angular.module('app', ['ngRoute', 'ngCookies']);
app.config(function ($routeProvider) {
  $routeProvider
  .when('/dashboard',{
      templateUrl: '../partials/dashboard.html',
      controller: 'loginController'
    })
    .when('/',{
        templateUrl: '../partials/login.html',
        controller: 'loginController'
    })
    .when('/newAppointment',{
        templateUrl: '../partials/newAppointment.html',
        controller: 'loginController'
    })
});
