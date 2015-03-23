

var myApp = angular.module('myApp', ['ngRoute', 'ngCookies']).factory('socket', function ($rootScope) {
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

var myController = myApp.controller('myController', ['$scope', '$rootScope', 'socket', '$http', '$cookies', '$timeout', function($scope, $rootScope, socket, $http, $cookies, $timeout){
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
        user: ''
    };
    $scope.workers = {
        init: function(){
            $http.get("/user/data").success(
                function(response) {
                    console.log(response);
                    if(!$cookies.user) {
                        $cookies.user = JSON.stringify(response);
                    }
                    console.log($cookies);
                }
            );

        }
    };
}]);