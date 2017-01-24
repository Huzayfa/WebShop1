
'use strict'
app.controller('ProductControlPanelListCtrl', function ($timeout,$scope, $http, $rootScope, pagingList) {
    $scope.productsList = [];
    $scope.productsListPaged = [];
    $scope.pager = {};
    $scope.responseMessage = "";
    $("body").css("cursor", "progress");
    //$("body").css("cursor", "wait");
    $http.get("/Product/Products", { cache: false }).then(function (response) {
        
        angular.copy(response.data, $scope.productsList);
        angular.copy($scope.productsList, $scope.productsListPaged);
        $scope.setPage(1);
        $("body").css("cursor","default");
    }

    );
    
    $scope.categoriesList = [];
    $http.get("/Category/Categories", { cache: false }).then(function (response) {

        angular.copy(response.data, $scope.categoriesList);
    }

    );

    $scope.newProduct = {};


    //Function For Select the page for paging
    $scope.setPage=function (page) {
        if (page < 1 || page > $scope.pager.totalPages) {
            return;
        }

        // get pager object from service
        $scope.pager = pagingList.GetPager($scope.productsList.length, page);
        // get current page of items
        $scope.productsListPaged = $scope.productsList.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
    }


    

    $scope.CreateProduct = function (newProduct) {
        
        var fdata = new FormData();
        fdata.append("file", $scope.photoFile);
        fdata.append("Name", newProduct.Name);
        fdata.append('CategoryId', newProduct.CategoryId);
        fdata.append('Price', newProduct.Price);
        fdata.append('Description', newProduct.Description);
        fdata.append('StockQuantity', newProduct.StockQuantity);
        fdata.append('StockQuantityToShow', newProduct.StockQuantityToShow);
        var promise=$http({
            method: 'POST',
            url: "Product/Create",
            headers: { 'Content-Type': undefined },
            data: fdata,
        });
        promise.success(function (response) {
            var product = {};
            copyProduct(response, product);
            $scope.productsList.push(product);
            $scope.productsListPaged.push(product);
            $scope.responseMessage = "Product Created";
            $timeout(function () {
                $scope.responseMessage = "";

            }, 3000);
        })
            .error(function (error) {
                $scope.status = 'Unable to load Create Product: ' + error.message;
                
            });
       
    }
       





    $scope.selectOrderBy = function (select) {
        $scope.selectedOrder = select;
    };

    $scope.editSelected = false;
    $scope.detailsSelected = false;
    $scope.selectedProductEditId = " ";
    $scope.selectedProductDetails = " ";


    $scope.fileNameChanged=function(elem)
    {
        $scope.photoFile = elem.files[0];

    }

    //Help Functions
    var findProductInList = function (list,productId) {

        for (var i = 0; i < list.length; i++) {
            if (productId == list[i].Id) {
                
                return i;
            }
        }

        return -1;

    }


    var copyProduct = function (sourceProduct, destinationProduct) {

        destinationProduct.Id = angular.copy(sourceProduct.Id);
        destinationProduct.Name = sourceProduct.Name;
        destinationProduct.Description = sourceProduct.Description;
        destinationProduct.Price = angular.copy(sourceProduct.Price);
        destinationProduct.StockQuantity = angular.copy(sourceProduct.StockQuantity);
        destinationProduct.StockQuantityToShow = angular.copy(sourceProduct.StockQuantityToShow);

    }

    $scope.cancelEdit = function (productId) {
        var modal = $('#productDetailsModal');
        if (modal != undefined)
        {
           modal.modal('hide');
        }
        
            $scope.selectedProductDetails = " ";
            $scope.editSelected = false;
            $scope.detailsSelected = false;
            $scope.selectedProductEditId = " ";     
        
    }

    $scope.DeleteProduct = function (productId) {
        $http.post('Product/Delete', JSON.stringify({ productId: productId })).then(function (response) {
            var index = findProductInList($scope.productsList,productId);
            if (index > -1) {
                $scope.productsList.splice(index, 1);
            }
            index = findProductInList($scope.productsListPaged, productId);
            if (index > -1) {
                $scope.productsListPaged.splice(index, 1);
            }
        });


    };

    //get Product By Id to Edit it
    $scope.EditProduct = function (productId) {
   
        $scope.selectedProductEditId = angular.copy(productId);
        
        $scope.selectedProduct = {};
        $http.get("/Category/Categories", { cache: false }).then(function (response) {

            angular.copy(response.data, $scope.categoriesList);
            $http.post('Product/ProductDetails', JSON.stringify({ productId: productId })).then(function (response) {

                angular.copy(response.data, $scope.selectedProduct);
            });
        });

        
        
        $scope.editSelected = true;
        $scope.detailsSelected = false;
        
        //setTimeout(function () {
        //    //var scrollPos = document.body.scrollTop;
        //    var element = document.getElementById("tableEditProduct" + productId);
        //    //var elementPos = $(element).position().top;
        //    // document.body.scrollTop = elementPos + $(element).height();
        //    element.tabIndex = "-10";
        //    element.focus();
        //    //element.scrollIntoView(true);
        //}, 100);
        
        //setTimeout(function () {
        //    var postScroll = document.getElementById("tableEditProduct" + productId);
        //    var element = $('#' + postScroll);
        //    var pos = $(element).position().top - 100 + $(element).parent().scrollTop();
        //    $('body').animate({
        //        scrollTop: pos
        //    }, 1000);
        //}, 1000);

        //var myElement = document.getElementById("tableEditProduct" + productId);
        //var topPos = myElement.offsetTop;
        //setTimeout(function () {
        //    window.scrollTo(0, topPos - 100)
        //}, 20);
        
        //document.getElementById('productTable').animate(topPos.top);
        //document.getElementById("tableEditProduct" + productId).scrollTop -= 10;
       // $("body").animate({scrollTop: "tableEditProduct"+productId}, "slow");
        //angular.element("body").animate({
        //    scrollTop: angular.element("tableEditProduct"+productId).top
        //}, 3000);
    
        
    }



    $scope.saveEditProduct = function (product) {
        
        $http.post('Product/Edit', product).then(function (response) {
            var index = findProductInList($scope.productsList,product.Id);
            if (index > -1) {
                copyProduct(product, $scope.productsList[index]);
            }
            var modal = $("#editProductModal");
            if (modal != undefined) {
                modal.modal('hide');
            }
            $scope.editSelected = false;
            $scope.detailsSelected = false;
            $scope.selectedProductEditId = " ";
            $scope.selectedProductDetails = " ";

          
        });
    }

    $scope.getProductDetails = function (productId) {

        $scope.selectedProductDetails= angular.copy(productId);
        $scope.editSelected = false;
        $scope.detailsSelected = true;
        $scope.selectedProductEditId = "";
        
        $scope.selectedProduct = {};
       

    }
});