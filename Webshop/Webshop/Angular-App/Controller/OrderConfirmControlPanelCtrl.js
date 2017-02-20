
'use strict'
app.controller('OrderConfirmControlPanelCtrl', function ($window, $scope, $http, $timeout,cartService,cookieOptionService) {

    $scope.confirm = "Order Confirmation ";
    cartService.counteTotalPriceQuantity();
    $scope.cart = cartService.getCart();

    $scope.cartLength = cartService.cartLength;
    $scope.clearShopCart = function () {
        console.log("Clear Cart");
        $window.sessionStorage.setItem(cookieOptionService.cookieName, null);
        $scope.cartLength = '';
        $scope.cart = [];
    }

}
);