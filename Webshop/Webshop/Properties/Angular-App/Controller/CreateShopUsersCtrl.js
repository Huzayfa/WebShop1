app.controller('CreateShopUsersCtrl', function ($scope, $http,$timeout, $q) {

    $scope.newUser = {};
    console.log("Create User Controller");
    $scope.responseMessage = "";


    $scope.CreateUser = function (newUser) {
        
        console.log($scope.newUser);
        
        $http({
            method: 'POST',
            url: "ShopUser/Create",
            data: newUser
            
        }).then(function (response) {
            $scope.responseMessage = response.data;
            console.log(response.data);
            $timeout(function () {
                $scope.responseMessage = "";
                if(response.data==="Done")
                {
                    newUser = {};
                   // document.getElementById('newUserForm').reset();
                }
            }, 3000);
           // angular.copy(response.data, $scope.selectedProduct);
        });
       
    }

});