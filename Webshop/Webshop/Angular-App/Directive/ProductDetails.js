app.directive('productDetails', function () {
    var controller = ['$scope', '$http', function ($scope, $http) {
        
        
        $scope.selectedProduct = {};
        $http.post('Product/ProductDetails', JSON.stringify({ productId: $scope.selectedProductDetailsId })).then(function (response) {

            angular.copy(response.data, $scope.selectedProduct);
        });
        
    }];

    return {
      //  restrict: "",
        // require: '^selectedProductId',
        
        scope: {
            selectedProductDetailsId: '=',
            selectedProduct:'=',
            close:'&',
        },
        controller: controller,
        templateUrl: '/Angular-App/Template/Directive/ProductDetailsPartialView.html?'+new Date(),
    };
});