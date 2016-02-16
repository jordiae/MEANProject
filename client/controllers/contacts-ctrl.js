
var ContactsCtrl = function($scope, ContactsService) {


    $scope.name = '';
    $scope.surname = '';
    $scope.company = '';
    $scope.phone = '';
    $scope.editId = '';
    $scope.contacts = [];


    refresh = function() {
        ContactsService.getContacts().then(function(contacts) {
            $scope.contacts = [];
            $scope.contacts = contacts;
            }, function(err) {
              console.log("Error loading contacts")
            });
        console.log("refreshed" + "contacts" + $scope.contacts);
    }

    refresh();

    $scope.addContact = function() {
    
        ContactsService.addContact({ name: $scope.name, surname: $scope.surname, company: $scope.company, phone: $scope.phone }).then(
            function() {
              console.log("Contact added")
            },
            function(err) {
              console.log("Error while adding the new contact")
            }
        );
        //refresh();
    };

    $scope.editContact = function(id) {
        ContactsService.getContact(id).then(
            function(contact) {
                 $scope.name = contact.name;
                 $scope.surname = contact.surname;
                 $scope.company = contact.company;
                 $scope.phone = contact.phone;
                 $scope.editId = id;
            },
            function(err) {
              console.log("Error while editing contact");
            });
        refresh();
    };

    $scope.clear = function() {
          $scope.name = '';
          $scope.surname = '';
          $scope.company = '';
          $scope.phone = '';
          $scope.editId = '';
    };


    $scope.removeContact = function(id) {
        ContactsService.removeContact(id).then(
            function() {
              console.log()
            },
            function(err) {
              console.log("Error while removing contact");
            });
        refresh();
    };

    $scope.updateContact = function() {
        ContactsService.updateContact($scope.editId, $scope.name, $scope.surname, $scope.company, $scope.phone).then(
            function() {
                console.log("Updated");
            },
            function(err) {
                console.log("Error while updating contact");
            }
        );


    }

};

angular.module('ContactsApp').controller('ContactsCtrl', ['$scope', 'ContactsService', ContactsCtrl]);