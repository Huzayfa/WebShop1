app.directive('orderDetails', function () {
    
    var controller = function ($scope, $http, orderServices) {
        console.log($scope.selectedOrderDetails);
        $scope.selectedOrder = {};
        $scope.selectedOrder = orderServices.getOrderDetails($scope.selectedOrderDetails);
    };
    var templateUrl=function(){
        return 'Angular-App/Template/Directive/OrderDetailsPartialView.html?'+new Date();
    }
    return {
        cache:false,
        //  restrict: "",
        // require: '^selectedProductId',
        scope: {
            selectedOrderDetails: '=',
            close:'&',
        },
        controller: controller,
        templateUrl: templateUrl()
    }
})