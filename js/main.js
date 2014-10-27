var app = angular.module('empanadas', ['ngRoute']).config(function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'templates/main.html',
            controller: 'MainController'
        })
});