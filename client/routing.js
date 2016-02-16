angular.module('ContactsApp').config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 
    function($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
    .state('layout', {
        abstract: true,
        templateUrl: '/views/partials/layout.html',
        controller: 'LayoutCtrl'
    })
    .state('login', {
        parent: 'layout',
        templateUrl: 'views/partials/login.html',
        url: '/login',
        controller: 'LoginCtrl'
    })
    .state('contacts', {
        parent: 'layout',
        templateUrl: 'views/partials/auth_protected/contacts.html',
        url: '/contacts',
        controller: 'ContactsCtrl'
    });


    // Redirect to login
    $urlRouterProvider.otherwise('/login');

    // In order to avoid '#' in the URL...
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

}]);

// .run executes when the app is already up and running
angular.module('ContactsApp').run(['$rootScope', 'LoginService', '$state', function($rootScope, LoginService, $state) {
    $rootScope.$on("$stateChangeStart", function(event, next) {
        if (!LoginService.isLoggedIn() && next.name !== "login") {
            event.preventDefault();
            $state.go("login");
        }
    });
}]);
