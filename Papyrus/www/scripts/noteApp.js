noteApp = angular.module('noteApp', []);
noteApp.controller('noteCtrl', function ($scope) {
    $scope.text = localStorage.getItem("note");
    $scope.save = function () {
        console.log("saving");
        localStorage.setItem("note", $scope.text);
    }
    $scope.clear = function () {
        console.log("clearing")
        $scope.text = "";
        $scope.save();
    }

});