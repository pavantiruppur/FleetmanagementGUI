angular
    .module('app', [
        'ui.router'
    ])
    .config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('vehicle', {
                url: '/',
                templateUrl: 'vehicle/vehicle.html',
                controller: 'vehicleCtrl'
            })
            .state('route', {
                url: '/route',
                templateUrl: 'route/route.html',
                controller: 'routeCtrl'
            })
            .state('user', {
                url: '/user',
                templateUrl: 'user/user.html',
                controller: 'userCtrl'
            })
            .state('package', {
                url: '/package',
                templateUrl: 'package/package.html',
                controller: 'packageCtrl'
            })
    }])