'use strict'
app.controller('LoginCtrl', function ($scope, $http, $cookies, $location, $timeout, $window, toaster) {
    $scope.responseMessage="";
    $scope.userLoginVieModel = {};
    var path = $location.absUrl();
    var login = ($location.url().toLowerCase() === "/login" );

    
    $scope.login = function () {
        $http.post('/Account/Login', $scope.userLoginVieModel).success(function (response, status) {
            
            if (login)
            {
                $window.location.href = "/Home";
               
            }
            else
            {
                $window.location.href = path;
               
                $window.location.reload();
            }
        }).error(function (error) {
            
            toaster.pop('error', "Error", "UserName Or PAssword Is not correct");
            
        });
    };


    

});