app.controller('RegisterShopUsersCtrl', function ($scope, $http,$timeout, $q) {

    $scope.newUser = {};
    console.log("Register User Controller");
    $scope.responseMessage = "";


    $scope.CreateUser = function (newUserForm,newUser) {
        
   
        $http({
            method: 'POST',
            url: "RegisterUser/Create",
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
                   // document.getElementById('newUserForm').reset();
                }
            }, 3000);
           // angular.copy(response.data, $scope.selectedProduct);
        });
       
    }

});