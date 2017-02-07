app.controller('ProductCustomerAllDetailsCtrl', function ($scope, $routeParams, $http) {
    console.log($routeParams.productId);
    var productId = $routeParams.productId;
    $scope.product = {};
    $http({
        method: 'GET',
        url: '/Product/ProductCustomerAllDetails/',
        //headers: {
        //    'Content-Type': undefined
        //},
        params: { productId: productId },
    }).then(function (response) {
        console.log(response.data);
        angular.copy(response.data, $scope.product);
    });

});