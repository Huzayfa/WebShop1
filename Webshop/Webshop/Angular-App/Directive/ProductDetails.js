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
       // transclude: true,
        scope: {
            selectedProductDetailsId: '=',
            selectedProduct:'=',
            close:'&',
        },
        compile: function (tElement, tAttrs, transclude) {
            
        },
        controller: controller,
        templateUrl: '/Angular-App/Template/Directive/ProductDetailsPartialView.html?' + new Date(),
        link: function ($scope, $element, $attrs) {
            
            
            //$("#productDetailsModal" + $scope.selectedProductDetailsId).modal('show');

           // $modal.open("productDetailsModal" +$scope.selectedProductDetailsId);
        }
    };
});