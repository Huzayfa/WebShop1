﻿
'use strict'
app.controller('RegisterUsersListCtrl', function ($scope, toJavaScriptDate, $http) {
    $scope.usersList = [];
    $("body").css("cursor", "progress");
    $http.get("/RegisterUser/ShopUsers",{cache:false}).then(function (response) {

        angular.copy(response.data, $scope.usersList);
    $("body").css("cursor", "default");

    }

    );

    
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
    
        $http.post('RegisterUser/Delete', JSON.stringify({ userId: userId })).then(function (response)
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
        $scope.editSelected = true;
        $scope.detailsSelected = false;
        
        $scope.selectedUserEditId = angular.copy(userId);
        $scope.selectedUser={};
        $http.post('RegisterUser/UserDetails', JSON.stringify({ userId: userId })).then(function (response) {

            angular.copy(response.data, $scope.selectedUser);
        });
    }



    $scope.saveEditUser=function(user)
    {
        $http.post('RegisterUser/Edit', user).then(function (response) {
            var index = findUserInList(user.Id);
            if (index > -1) {
                copyUser(user, $scope.usersList[index]);
            }
            $scope.editSelected = false;
            $scope.detailsSelected = false;
            $scope.selectedUserEditId = " ";
            $scope.selectedUserDetails = " ";

        });
    }

    $scope.getUserDetails=function(userId)
    {
        
        $scope.editSelected = false;
        $scope.detailsSelected = true;
        $scope.selectedUserEditId = "";
        $scope.selectedUserDetails = angular.copy(userId);
        $scope.selectedUser = {};
        $http.post('RegisterUser/UserDetails', JSON.stringify({ userId: userId })).then(function (response) {
            if (response.data != null && response.data != undefined)
            {
                if(response.data.orders!=null && response.data.orders!=undefined)
                {
                    
                    for(var i=0;i<response.data.orders.length;i++)
                    {
                        response.data.orders[i].OrderDate = toJavaScriptDate(response.data.orders[i].OrderDate);
                    }
                }
            }
            angular.copy(response.data, $scope.selectedUser);
            
        });
        
    }

}
    );