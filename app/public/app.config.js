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
      .state({
        name: 'edit',
        url: '/posts/:id/edit',
        component: 'update'
      })
  }

}());
