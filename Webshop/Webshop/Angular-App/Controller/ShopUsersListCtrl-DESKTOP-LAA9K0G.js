//(function()

//{
'use strict'
app.controller('ShopUsersListCtrl', function ($scope, $http) {
    $scope.usersList = [];
    console.log("ShopUsersListCtrl");
    $http.get("/ShopUser/ShopUsers",{cache:false}).then(function (response) {

        angular.copy(response.data, $scope.usersList);
    }

    );
    console.log("v ShopUsersListCtrl");
    //$scope.selectedOrder = 'FullName';
    $scope.selectOrderBy = function (select) {
        $scope.selectedOrder = select;
    };

    $scope.editSelected = false;
    $scope.detailsSelected = false;
    $scope.selectedUserEditId = " ";
    $scope.selectedUserDetails = " ";

    //Help Functions
    var findUserInList=function(userId)
    {
        
        for(var i=0;i<$scope.usersList.length;i++)
        {
            if(userId==$scope.usersList[i].Id)
            {
                return i;
            }
        }

        return -1;

    }


    var copyUser=function(sourceUser,destinationUser)
    {
        console.log(sourceUser);
        console.log(destinationUser);
        destinationUser.Id=angular.copy(sourceUser.Id);
        destinationUser.FullName = sourceUser.FirstName + " " + sourceUser.LastName;
        destinationUser.Email=angular.copy(sourceUser.Email);
    }

    $scope.cancelEdit=function(userId)
    {
        $scope.editSelected = false;
        $scope.detailsSelected = false;
        $scope.selectedUserEditId = " ";
        $scope.selectedUserDetails = " ";
    }

    $scope.DeleteUser = function (userId) {
    

        
        
        $http.post('ShopUser/Delete', JSON.stringify({ userId: userId })).then(function (response)
        {
            var index = findUserInList(userId);
            if (index > -1)
            {
                $scope.usersList.splice(index, 1);
            }
            
        });


    };

    //get User By Id to Edit hem
    $scope.EditUser=function(userId)
    {
        console.log("Edit User" + userId);
        $scope.editSelected = true;
        $scope.detailsSelected = false;
        
        $scope.selectedUserEditId = angular.copy(userId);
        console.log($scope.selectedUserEditId);
        //$scope.SelectedUserEditId = userId;
        $scope.selectedUser={};
        $http.post('ShopUser/UserDetails', JSON.stringify({ userId: userId })).then(function (response) {

            angular.copy(response.data, $scope.selectedUser);
        });
        console.log($scope.selectedUser);
    }



    $scope.saveEditUser=function(user)
    {
        $http.post('ShopUser/Edit', user).then(function (response) {
            var index = findUserInList(user.Id);
            if (index > -1) {
                copyUser(user, $scope.usersList[index]);
            }
            $scope.editSelected = false;
            $scope.detailsSelected = false;
            $scope.selectedUserEditId = " ";
            $scope.selectedUserDetails = " ";
            
           // angular.copy(response.data, $scope.selectedUser);
        });
    }

    $scope.getUserDetails=function(userId)
    {
        console.log("User Details " + userId);
        $scope.editSelected = false;
        $scope.detailsSelected = true;
        $scope.selectedUserEditId = "";
        $scope.selectedUserDetails = angular.copy(userId);
        $scope.selectedUser = {};
        $http.post('ShopUser/UserDetails', JSON.stringify({ userId: userId })).then(function (response) {

            angular.copy(response.data, $scope.selectedUser);
        });
        console.log($scope.selectedUser);
        
    }








}
    );
//console.log(app);
//}

//)();
