var LayoutCtrl = function($scope, $state, LoginService) {
    $scope.pageName = function() {
        if ($state.includes('login')) return "Login";
        else return "Contacts";
    };
};


angular.module('ContactsApp').controller('LayoutCtrl', ['$scope', '$state', 'LoginService', LayoutCtrl]);