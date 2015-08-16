hasteApp = angular.module('optionsApp', ['ngTouch']);
noteApp.controller('hasteCtrl', function ($scope, $http) {

    $scope.save = function () {
        console.log("Saving...");
    }
});