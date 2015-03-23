var myApp = angular.module('myApp', ['ngRoute']).factory('socket', function ($rootScope) {
    var socket = io.connect('http://localhost:3000');
    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }
    };
}).config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        // Allow loading from our assets domain.  Notice the difference between * and **.
        'http://www.youtube.com/**']);
});

var myController = myApp.controller('myController', function($scope, $rootScope, socket){
    var previousUrl;
    $rootScope.$on('$locationChangeStart', function(event, newUrl, oldUrl) {

        if (previousUrl && previousUrl === newUrl) {
            //Browser is navigating back

            event.preventDefault();
            $scope.workers.back();
        } else {
            event.preventDefault();
            previousUrl = oldUrl;
            $scope.workers.back();
        }

    });

    $scope.data = {

    };
    $scope.workers = {

    };
});