app.controller('RecommendedProductCtrl', function ($scope, $http, $timeout,cartService) {

    $scope.recommedndedProductsList = [];
    
    //$("body").css("cursor", "progress");
    //$("body").css("cursor", "wait");
    $scope.$emit("Load");
    $scope.carouselSlide = "";
    $http.get("/Product/RecommedndedProducts", { cache: false }).then(function (response) {

        angular.copy(response.data, $scope.recommedndedProductsList);
        //$("body").css("cursor", "default");
        $scope.carouselSlide = "carousel slide";
        $scope.$emit("UNLoad");
    }
    );
    $scope.addToCart = function (product) {
        var length = cartService.addToCart(product);
        if (length > 0) {
            $scope.cartLength = length;
        }

    }

})