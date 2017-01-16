//(function()

//{
'use strict'
app.controller('CategoryControlPanelListCtrl', function ($scope, $http, $rootScope) {
    $scope.categoriesList = [];
    $http.get("/Category/Categories", { cache: false }).then(function (response) {

        angular.copy(response.data, $scope.categoriesList);
    }

    );
    $scope.newCategory = {};
    $scope.CreateCategory = function (newCategory) {
        console.log("Create Category");
        $http({
            method: 'POST',
            url: "Category/Create",
            data: newCategory

        }).then(function (response) {
            if (response.data != null)
            {
                var category = {};
                copyCategory(response.data, category);
                $scope.categoriesList.push(category);
            }
            
        })
    }






    $scope.selectOrderBy = function (select) {
        $scope.selectedOrder = select;
    };

    $scope.editSelected = false;
    $scope.detailsSelected = false;
    $scope.selectedCategoryEditId = " ";
    $scope.selectedCategoryDetails = " ";

    //Help Functions
    var findCategoryInList = function (categoryId) {

        for (var i = 0; i < $scope.categoriesList.length; i++) {
            if (categoryId == $scope.categoriesList[i].Id) {
                return i;
            }
        }

        return -1;

    }


    var copyCategory = function (sourceCategory, destinationCategory) {

        destinationCategory.Id = angular.copy(sourceCategory.Id);
        destinationCategory.Name = sourceCategory.Name;
       
    }

    $scope.cancelEdit = function (categoryId) {
        $scope.editSelected = false;
        $scope.detailsSelected = false;
        $scope.selectedCategoryEditId = " ";
        $scope.selectedCategoryDetails = " ";
    }

    $scope.DeleteCategory = function (categoryId) {




        $http.post('Category/Delete', JSON.stringify({ categoryId: categoryId })).then(function (response) {
            var index = findCategoryInList(categoryId);
            if (index > -1) {
                $scope.categoriesList.splice(index, 1);
            }

        });


    };

    //get User By Id to Edit hem
    $scope.EditCategory = function (categoryId) {

        $scope.editSelected = true;
        $scope.detailsSelected = false;

        $scope.selectedCategoryEditId = angular.copy(categoryId);

        $scope.selectedCategory = {};
        $http.post('Category/Details', JSON.stringify({ categoryId: categoryId })).then(function (response) {

            angular.copy(response.data, $scope.selectedCategory);
        });

    }



    $scope.saveEditCategory = function (category) {
        $http.post('Category/Edit', category).then(function (response) {
            var modal=$("#editCategoryModal");
            if (modal != undefined) {
                console.log("Hide");
                modal.modal('hide');
            }
            var index = findCategoryInList(category.Id);
            if (index > -1) {
                copyCategory(category, $scope.categoriesList[index]);
            }
            $scope.editSelected = false;
            $scope.detailsSelected = false;
            $scope.selectedCategoryEditId = " ";
            $scope.selectedCategoryDetails = " ";


        });
    }

    $scope.getCategoryDetails = function (categoryId) {

        $scope.editSelected = false;
        $scope.detailsSelected = true;
        $scope.selectedCategoryEditId = "";
        $scope.selectedCategoryDetails = angular.copy(categoryId);
        $scope.selectedCategory = {};
        $http.post('Category/Details', JSON.stringify({ categoryId: categoryId })).then(function (response) {

            angular.copy(response.data, $scope.selectedCategory);
        });
       

    }








}
    );