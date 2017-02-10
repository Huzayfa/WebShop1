'use strict'
app.controller('ViewShopCartCtrl', function ($window,$scope, $http, $cookies,cartService, cookieOptionService) {

    $scope.cartLength = cartService.cartLength;
    
    $scope.cart = cartService.getCart();
   
   
    $scope.$watch('cart', function (neww, old) {
        console.log(neww);
        cartService.setCart(neww);
        counteTotalPriceQuantity(neww);
        cartService.totalPrice = $scope.totalPrice;
        cartService.cartLength = $scope.cartLength;
    }, true);
   
    var counteTotalPriceQuantity = function (cart)
    {
        $scope.totalPrice = 0;
        $scope.cartLength = 0;
        if (cart === undefined || cart === null) {
            return;
        }
        else {
            
            for (var i = 0; i < cart.length; i++) {
                $scope.totalPrice += cart[i].Quantity * cart[i].Price;
                $scope.cartLength += cart[i].Quantity;
            }
            
        }
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
        
        if ($scope.cart === undefined || $scope.cart === null)
        {
            
            return;
        }
        else
        {
            var index = findProductInCart($scope.cart, productId);
            if (index > -1)
            {
                $scope.cart.splice(index, 1);
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