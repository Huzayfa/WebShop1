app.controller('RecommendedProductCtrl', function ($scope, $http, $timeout) {

    $scope.recommedndedProductsList = [];
    
    //$("body").css("cursor", "progress");
    $("body").css("cursor", "wait");
    $scope.carouselSlide = "";
    $http.get("/Product/RecommedndedProducts", { cache: false }).then(function (response) {

        angular.copy(response.data, $scope.recommedndedProductsList);
        $("body").css("cursor", "default");
        $scope.carouselSlide = "carousel slide";
    }
    );

})