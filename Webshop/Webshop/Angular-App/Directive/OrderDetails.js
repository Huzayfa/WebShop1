app.directive('orderDetails', function () {
    
    var controller = function ($scope, $http, orderServices) {
        //Controller Run just one time 
        console.log($scope.selectedOrder);
    };
    var link = function ($scope, $http, orderServices) {
        //Link Run just one time 
        console.log($scope.selectedOrder);
    };
    var templateUrl=function(){
        return 'Angular-App/Template/Directive/OrderDetailsPartialView.html?'+new Date();
    }
    return {
        cache:false,
        //  restrict: "",
        
        scope: {
            selectedOrderDetailsId: '=',
            selectedOrder:'=',
            close:'&',
        },
        controller: controller,
        templateUrl: templateUrl(),
        link:link,
    }
})