'use strict'
app.controller('LoginCtrl', function ($scope, $http, $cookies, $location,$timeout, $window) {
    $scope.responseMessage="";
    $scope.userLoginVieModel = {};
    var path = $location.absUrl();
    var login = ($location.url().toLowerCase() === "/login" );

    
    $scope.login = function () {
        $http.post('/Account/Login', $scope.userLoginVieModel).success(function (response, status) {
            
            if (login)
            {
                $window.location.href = "Home";
               
            }
            else
            {
                $window.location.href = path;
               
                $window.location.reload();
            }
           // $scope.$apply(function () {  });
        }).error(function (error) {
            $scope.responseMessage = "UserName Or Password Is not Valid";
            $timeout(function () {
                $scope.responseMessage = "";

            },3000);
        });
    };


    

});