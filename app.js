(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies'])
        .config(config)
        .run(run);
        

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/home', {
                controller: 'HomeController',
                templateUrl: 'views/home/home.view.html',
                controllerAs: 'vm'
            })

            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'views/login/login.view.html',
                controllerAs: 'vm'
            })

            .when('/settings', {
                controller: 'settings',
                templateUrl: 'views/settings/settings.view.html',
                controllerAs: 'vm'
            })
            .when('/addNewProduct', {
                controller: 'addNewProduct',
                templateUrl: 'views/addNewProduct/addNewProduct.view.html',
                controllerAs: 'comp'
            })
            .when('/updateProduct', {
                controller: 'updateProduct',
                templateUrl: 'views/updateProduct/updateProduct.view.html',
                controllerAs: 'update'
            })

            .when('/completeStock', {
                controller: 'completeStock',
                templateUrl: 'views/completeStock/completeStock.view.html',
                controllerAs: 'vm'
            })
            .when('/allInvoices', {
                controller: 'allInvoices',
                templateUrl: 'views/allInvoices/allInvoices.view.html',
                controllerAs: 'vm'
            })
            .when('/settings', {
                controller: 'settings',
                templateUrl: 'views/settings/settings.view.html',
                controllerAs: 'vm'
            })
            .otherwise({ redirectTo: '/login' });
    }

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
    function run($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
 
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/home']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }

})();