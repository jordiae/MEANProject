// auth-interceptor ($http): token, check authentication

// A factory is like a service, but in factories we can't use "this.variable" to make a particular variable public

angular.module('ContactsApp').factory('authInterceptor', function ($q, $window, $injector) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                // Token -> header
                config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
            }
            return config;
        },
        response: function (response) {
            if (response.status === 401) {
                $injector.get('$state').transitionTo('login'); // transition = go
            } 
            return response;
        }
    };
});

angular.module('ContactsApp').config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});