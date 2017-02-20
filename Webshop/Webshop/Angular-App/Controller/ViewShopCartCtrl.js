'use strict'
app.controller('ViewShopCartCtrl', function ($window,$scope, $http, $cookies,cartService, cookieOptionService) {

    $scope.cartLength = 0;
    
    $scope.totalPrice = 0;
    cartService.counteTotalPriceQuantity();
    $scope.cartLength = cartService.cartLength;
    $scope.totalPrice = cartService.totalPrice;
    $scope.cart = cartService.getCart();
    $scope.printToCart = function (printSectionId) {
        var innerContents = document.getElementById(printSectionId).innerHTML;
        var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html><head><style> table { page-break-inside:auto; } td    { border:1px solid lightgray; } tr    { page-break-inside:auto; }</style></head><body onload="window.print()">' + innerContents + '</body></html>');
        popupWinindow.document.close();
    }
   
    $scope.$watch('cart', function (neww, old) {
        cartService.setCart(neww);
        cartService.counteTotalPriceQuantity();
        $scope.cartLength = cartService.cartLength;
        $scope.totalPrice = cartService.totalPrice;
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