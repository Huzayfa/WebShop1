'use strict'
app.controller('LoginCtrl', function ($scope, $http, $cookies, $location,$timeout, $window) {
    $scope.responseMessage="";
    $scope.userLoginVieModel = {};
    var path = $location.absUrl();
    var login = ($location.url().toLowerCase() === "/login" );
    console.log(login);

    console.log(path);
    $scope.login = function () {
        $http.post('Account/Login', $scope.userLoginVieModel).success(function (response, status) {
            console.log(status);
            if (login)
            {
                $window.location.href = "home";
                console.log($window.location.href);
            }
            else
            {
                $window.location.href = path;
                console.log($window.location.href);
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