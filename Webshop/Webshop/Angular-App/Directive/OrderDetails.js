app.directive('orderDetails', function () {
    
    var controller = function ($scope, $http, orderServices) {
        //Controller Run just one time 
    };
    var link = function ($scope, $http, orderServices) {
        //Controller Run just one time 
    };
    var templateUrl=function(){
        return 'Angular-App/Template/Directive/OrderDetailsPartialView.html?'+new Date();
    }
    return {
        cache:false,
        //  restrict: "",
        
        scope: {
            selectedOrderDetails: '=',
            selectedOrder:'=',
            close:'&',
        },
        controller: controller,
        templateUrl: templateUrl(),
        link:link,
    }
})