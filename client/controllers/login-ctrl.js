var LoginCtrl = function($scope, LoginService, $state) {
    $scope.user = {
        mail: '',
        password: ''
    };

    $scope.register = function() {
        // Since LoginService is asynchronous, we have to take its promise:
        // .then(function_ok, function_error)
        LoginService.register($scope.user)
            .then(function() {
                alert("Welcome " + $scope.user.mail);
            }, function(err) {
                console.log(err);
                if (err.code === 11000) alert("User already exists");
                else if (err.status === 500) alert("Error");
            });
    };

    $scope.login = function() {
        LoginService.login($scope.user)
            .then(function() {
                $state.go('contacts');
            }, function(err) {
                if (err.status === 401) alert("Wrong password");
                else if (err.status === 404) alert("User doesn't exist");
                else if (err.status === 500) alert("Error");
            });
    };
};


angular.module('ContactsApp').controller('LoginCtrl', ['$scope', 'LoginService', '$state', LoginCtrl]);