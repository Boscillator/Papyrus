noteApp = angular.module('noteApp', ['ngTouch']);

/**
    Contoller for the note pad,
    handels loading and saving from local storage
**/
noteApp.controller('noteCtrl', function ($scope) {

    if (localStorage.getItem("note") != null) {
        $scope.text = localStorage.getItem("note");
    }
    else {
        $scope.text = "FILLER TEXT";
    }
    
    $scope.save = function () {
        console.log("Saving");
        localStorage.setItem("note", $scope.text);
    }
    $scope.clear = function () {
        console.log("Clearing");
        $scope.text = "";
        $scope.save();
    }

    $scope.switchPage = function () {
        $.mobile.changePage("#options");
    }

    $scope.$on('updateData', function (event, args) {
        console.log("updating Data");
        $scope.text = args;
        $scope.save();
        $scope.$apply();
        $.mobile.changePage("#notePage");
    });

});

/**
    Controller for body of options page,
    allows swiping back to other page
**/
noteApp.controller('optionsCtrl', function ($scope) {

    $scope.switchPage = function () {
        console.log("switching page");
        $.mobile.changePage("#notePage");
    }

});

/**
    Controller for copy and paste buttons
**/
noteApp.controller('clipboardCtrl', function ($scope, $rootScope) {

    $scope.copy = function () {
        cordova.plugins.clipboard.copy(localStorage.getItem("note"));
    }

    $scope.paste = function () {
        cordova.plugins.clipboard.paste(function (data) {
            $rootScope.$broadcast('updateData', data);
        })
    }

});


/**
    Controller that handels posting to and getting data form pastebin.
    Also keeping track of resent pasts.
**/
noteApp.controller('pasteCtrl', function ($scope, $rootScope) {

    //The code to use with pastebin
    $scope.code = "";

    //Get data from pastebin
    $scope.get = function () {
        console.log("getting: " + escape($scope.code));
        $.get("http://pastebin.com/raw.php?i=" + escape($scope.code), function (data) {
            console.log("Pastebin data gotten")
            $rootScope.$broadcast('updateData', data);
            
        });
        
    }

    /*

    $scope.saveToPastebin = function () {

        var note = localStorage.getItem('note');
        //note = escape(note);
        console.log(note);

        if (localStorage.getItem("PASTEBIN_username") != null && localStorage.getItem("PASTEBIN_password") != null) {
            console.warn("PASTEBIN LOGGIN NOT IMPLEMENTED")
        }
        else {
            $.post(PASTEBIN_post_url, {
                api_option: 'paste',
                api_dev_key: PASTEBIN_dev_key,
                api_paste_code: note
                

                
            }, function (data) {
                console.log(data);
            });
        }
    }
    */

    

});

