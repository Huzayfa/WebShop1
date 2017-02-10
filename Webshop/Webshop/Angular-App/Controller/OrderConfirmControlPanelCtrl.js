
'use strict'
app.controller('OrderConfirmControlPanelCtrl', function ($window, $scope, $http, $timeout,cartService) {

    $scope.confirm = "Order Confirmation ";

    $scope.cart = cartService.getCart();

    $scope.cartLength = cartService.cartLength;
    $scope.clearShopCart = function () {

        $window.sessionStorage.setItem(cookieOptionService.cookieName, null);
        $scope.cartLength = '';
        $scope.cart = [];
    }

}
);