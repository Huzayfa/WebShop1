app.controller('AppCtrl', function ($scope, $rootScope) {
    console.log()
   
    $rootScope.$on('$locationChangeStart', function (event, toState, toParams, fromState, fromParams) {
        $scope.Loading = true;
    });
    
    $rootScope.$on("Load",function (event, toState, toParams, fromState, fromParams) {
        $scope.Loading = true;
    });

    
    $rootScope.$on('UNLoad', function () {
        console.log("UNLoad");
        $scope.Loading = false;
    });

    $rootScope.$on('$routeChangeSuccess', function () {
        console.log("UNLoad");
        $scope.Loading = false;
    });
});