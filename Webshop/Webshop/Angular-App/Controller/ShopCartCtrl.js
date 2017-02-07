'use strict'
app.controller('ShopCartCtrl', function ($scope, $http, $cookies, $window, cookieOptionService, cartService)
{

    $scope.cartLength = cartService.getCartLength();
    $scope.productsList = [];
    $("body").css("cursor", "progress");
    $http.get("/Product/ProductsForCustomer", { cache: false }).then(function (response) {

        angular.copy(response.data, $scope.productsList);

        $("body").css("cursor", "default");

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
        var length=cartService.addToCart(product);
        if(length>0)
        {
            $scope.cartLength=length;
        }

    }





});