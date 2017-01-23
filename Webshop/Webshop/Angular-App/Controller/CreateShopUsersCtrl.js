app.controller('CreateShopUsersCtrl', function ($scope, $http,$timeout, $q) {

    $scope.newUser = {};
    console.log("Create User Controller");
    $scope.responseMessage = "";


    $scope.CreateUser = function (newUserForm,newUser) {
        
   
        $http({
            method: 'POST',
            url: "ShopUser/Create",
            data: newUser
            
        }).then(function (response) {
            $scope.responseMessage = response.data;
            
            $timeout(function () {
                $scope.responseMessage = "";
                
                if(response.data==="Done")
                {
                    
                    $scope.newUser = {};
                    newUserForm.$setPristine(true);
                    newUserForm.$setUntouched(true);
                  
                }
            }, 3000);
           // angular.copy(response.data, $scope.selectedProduct);
        });
       
    }

});