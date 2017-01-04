'use strict'
app.controller('ViewShopCartCtrl', function ($window,$scope, $http, $cookies, cookieOptionService) {

    //$scope.totalPrice = 0;
    
    // $scope.cart = $cookies.getObject(cookieOptionService.cookieName);
    $scope.cart =angular.fromJson($window.sessionStorage[cookieOptionService.cookieName]);
    //$window.sessionStorage.setItem(cookieOptionService.cookieName, cart);
    //console.log($scope.cart);
    if ($scope.cart === undefined || $scope.cart === null)
    {
        $scope.cart = [];
    }
    $scope.$watch('cart', function (neww, old) {
        $scope.totalPrice = counteTotalPrice(neww);
    }, true)
   
    $scope.clearShopCart=function()
    {
        //$cookies.putObject(cookieOptionService.cookieName, null);
        $window.sessionStorage.setItem(cookieOptionService.cookieName,null);
        $scope.cartLength = '';
        $scope.cart = [];
    }
    /*
    $scope.confirmShoping=function()
    {
        var cart = $cookies.getObject(cookieOptionService.cookieName);

        if (cart === undefined || cart === null)
        {
            return;
        }
        $http.post('ShopCart/ConfirmShoping', cart).then(function (response) {
            $scope.clearShopCart();
            //angular.copy(response.data, $scope.selectedUser);
        });
    }
    */

    $scope.deleteProductFromCart=function(productId)
    {
        
        //var cart = $cookies.getObject(cookieOptionService.cookieName);
        var cart = angular.fromJson($window.sessionStorage[cookieOptionService.cookieName]);
        console.log(cart);
        if (cart === undefined || cart === null)
        {
            
            return;
        }
        else
        {
            var index = findProductInCart(cart, productId);
            if (index > -1)
            {
                console.log(cart);
                console.log(index);
                cart.splice(index, 1);
                console.log(cart);
                $window.sessionStorage.setItem(cookieOptionService.cookieName, angular.toJson(cart));
                $scope.cart =angular.fromJson($window.sessionStorage[cookieOptionService.cookieName]);
                //$cookies.putObject(cookieOptionService.cookieName, cart);
               // $scope.cart = $cookies.getObject(cookieOptionService.cookieName);
            }

        }
    }



    //Help Function
    var findProductInCart=function(cart,productId)
    {
        for(var i=0;i<cart.length;i++)
        {
            if(cart[i].Id==productId)
            {
                return i;
            }
        }
        return -1;
    }
    var counteTotalPrice=function(cart)
    {
        var totalPrice = 0;
        if (cart === undefined || cart === null)
        {
            return totalPrice;
        }
        for(var i=0;i<cart.length;i++)
        {
            totalPrice += (cart[i].Price*cart[i].Quantity);
        }
        return totalPrice;
    }

});