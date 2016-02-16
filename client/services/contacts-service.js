ContactsService = function($http, $q, LoginService) {
    var SERVER_URL_CONTACTS = "http://localhost:8080/users/contacts/"

    var self = this;

    var contacts = null;
    var contact = null;

    this.getContacts = function() {
        var q = $q.defer();

        if (!LoginService.isLoggedIn()) q.reject();
        else LoginService.getUser().then(
            function(user) {
                contacts = user.contacts;//
                q.resolve(contacts);
            }, function(error) {
                q.reject(error);
            }
        );

        return q.promise;
    }
    this.getContact = function(id) {
        var q = $q.defer();

        if (!LoginService.isLoggedIn()) q.reject();
        else LoginService.getUser().then(
            function(user) {
                contacts = user.contacts; //
                var index = -1;
                for (var i = 0; i < contacts.length; ++i) {
                    if (contacts[i]._id === id)
                        index = i;
                }
                contact = contacts[index];
                q.resolve(contact);
            }, function(error) {
                q.reject(error);
            }
        );

        return q.promise;
    }

    this.updateContact = function(id, name, surname, company, phone) {
        var q = $q.defer();

        $http.patch(SERVER_URL_CONTACTS + id, { name: name, surname: surname, company: company, phone: phone })
            .then(
                function(data) {
                    //contacts = user.contacts;
                    var index = -1;
                    for (var i = 0; i < contacts.length; ++i) {
                        if (contacts[i]._id === id)
                            index = i;
                     }
                    contacts[index].name = name;
                    contacts[index].surname = surname;
                    contacts[index].company = company;
                    contacts[index].phone = phone;
                    q.resolve();
                },
                function(err) {
                    q.reject(err);
                }
            );

        return q.promise;
    }

    this.addContact = function(contact) {
        var q = $q.defer();
        $http.post(SERVER_URL_CONTACTS, contact)
            .then(
                function(data) {

                    contacts.push(data.data.contacts[data.data.contacts.length-1]);
                    q.resolve();
                },
                function(err) {
                    q.reject(err);
                }
            );

        return q.promise;
    }

    this.removeContact = function(id) {
        var q = $q.defer();

        $http.delete(SERVER_URL_CONTACTS + id )
            .then(
                function(data) {

                    contacts.pop(data.data.contacts[data.data.contacts.length-1]);
                    q.resolve();
                },
                function(err) {
                    q.reject(err);
                }
            );

        return q.promise;
    }

        


}

angular.module('ContactsApp').service('ContactsService', ['$http', '$q', 'LoginService', ContactsService]);