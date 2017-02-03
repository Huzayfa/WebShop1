app.directive('productDetails', function () {
    var controller = ['$scope', '$http', function ($scope, $http) {
        
       
       
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
        //compile: function (tElement, tAttrs, transclude) {
            
        //},
        controller: controller,
        templateUrl: '/Angular-App/Template/Directive/ProductDetailsPartialView.html?' + new Date(),
        link: function (scope, el, attr) {
            
        }
    };
});