(function() {
  'use strict';

  angular.module('app').config(config)

  // TODO: figure out how to configure the app correctly
  config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider']

  function config($stateProvider, $urlRouterProvider, $locationProvider){

    // this line is optional
    $locationProvider.html5Mode(true)

    $stateProvider
      .state({
        name: 'posts',
        url: '/',
        component: 'posts'
      })
      // .state({
      //   name: 'new',
      //   url: '/houses/new',
      //   component: 'houseNew'
      // })
      // .state({
      //   name: 'show',
      //   url: '/houses/:id',
      //   component: 'houseShow'
      // })

  }

}());
