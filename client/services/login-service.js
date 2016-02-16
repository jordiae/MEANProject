// Service. Sign up, log in and get user

// $http, $q

LoginService = function($http, $q, $window) {
    var SERVER_URL_AUTH = "http://localhost:8080/authenticate";
    var SERVER_URL_USERS = "http://localhost:8080/users";

    var user = null;

    this.login = function(user) {
        var q = $q.defer();

        // POST: body = user (username and password)
        $http.post(SERVER_URL_AUTH, user)
            .then(
                function(data) {
                    // We save the given token.
                    $window.sessionStorage.token = data.data.token;
                    q.resolve();
                },
                function(err) {
                    q.reject(err);
                }
            );

        return q.promise;
    };

    this.isLoggedIn = function() {
        return typeof $window.sessionStorage.token !== "undefined"; 
    }

    this.logout = function() {
        user = null;
        delete $window.sessionStorage.token;
    }

    this.getUser = function() {
        var q = $q.defer();
        if (user) {
            q.resolve(user);
            return q.promise;
        }
        else return this.reloadUser();
    }

    this.getUserSync = function() {
        return user;
    }

    this.reloadUser = function() {
        var q = $q.defer();

        $http.get(SERVER_URL_USERS)
            .then(
                function(data) {
                    user = data.data;
                    q.resolve(user);
                },
                function(err) {
                    q.reject(err);
                }
            );

        return q.promise;
    }

    this.register = function(user) {
        var q = $q.defer();
        
        $http.post(SERVER_URL_USERS, user)
            .then(
                function(data) {
                    q.resolve();
                },
                function(err) {
                    q.reject(err.data);
                }
        );

        return q.promise;
    };
}

angular.module('ContactsApp').service('LoginService', ['$http', '$q', '$window', LoginService]);