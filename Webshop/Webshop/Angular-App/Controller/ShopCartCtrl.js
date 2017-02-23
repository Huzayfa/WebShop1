'use strict'
app.controller('ShopCartCtrl', function ($scope, $http, $cookies, $window, cookieOptionService, cartService)
{
    cartService.counteTotalPriceQuantity();
    $scope.cartLength = cartService.cartLength;
    $scope.productsList = [];
    $scope.categoriesList = [];
    $("body").css("cursor", "progress");
    $http.get("/Product/ProductsForCustomer", { cache: false }).then(function (response) {

        angular.copy(response.data, $scope.productsList);
       
        $("body").css("cursor", "default");

    }

    );
    $http.get("/Category/Categories", { cache: false }).then(function (response) {

        angular.copy(response.data, $scope.categoriesList);

    }
    ,
    function () {

    }

    );




    //Help Function
    var findProductInList = function (productId, productList) {
        for (var i = 0; i < productList.length; i++) {
            if (productId == productList[i].Id) {
                return i;
            }
        }
        return -1;
    }


    $scope.addToCart = function (product) {
        cartService.addToCart(product);
        cartService.counteTotalPriceQuantity();
        if(length>0)
        {
            $scope.cartLength = cartService.cartLength;
        }

    }

});