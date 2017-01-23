'use strict'
app.controller('ShopCartCtrl', function ($scope, $http, $cookies,$window ,cookieOptionService) {
  
    var cart =angular.fromJson($window.sessionStorage[cookieOptionService.cookieName]);
    /* using Cokki to save the Cart
    var cart = $cookies.getObject(cookieOptionService.cookieName);
        if (cart === undefined || cart === null) {
            $scope.cartLength = ''; 
        }
        else {
            $scope.cartLength = cart.length;
        }
      */ 
    if (cart === undefined || cart === null) {
        $scope.cartLength = '';
    }
    else {
        $scope.cartLength = cart.length;
    }
    $scope.productsList = [];
    $("body").css("cursor", "progress");
    $http.get("/Product/Products", { cache: false }).then(function (response) {

        angular.copy(response.data, $scope.productsList);

    $("body").css("cursor", "default");

    }

    );




    //Help Function
    var findProductInList = function (productId,productList) {
        for (var i = 0; i < productList.length; i++) {
            if (productId == productList[i].Id) {
                return i;
            }
        }
        return -1;
    }


    $scope.addToCart=function(product)
    {
        //$cookies.put('customerCart', undefined);
        //console.log(product);
        var cart =angular.fromJson($window.sessionStorage[cookieOptionService.cookieName]);
        /*var cart = $cookies.getObject(cookieOptionService.cookieName);*/
        if (cart === undefined || cart === null)
        {
            var p = {};
            p.Id = angular.copy(product.Id);
            p.Quantity = 1;
            p.Price = angular.copy(product.Price)
            cart = [p];
            $scope.cartLength = 1;
           /* $cookies.putObject(cookieOptionService.cookieName,JSON.stringify(cart), {
                expires: cookieOptionService.exp
            });
            
            $cookies.putObject(cookieOptionService.cookieName,cart,
               { expires: cookieOptionService.exp }
                );
            console.log(JSON.stringify(cart));
            */
        }
        else {
            var index = findProductInList(product.Id,cart)
            if (index == -1)
            {
                
                var p = {};
                p.Quantity = 1;
                p.Id = angular.copy(product.Id);
                product.Quantity = 1;
                p.Price = angular.copy(product.Price) 
                cart.push(p);
                $scope.cartLength = cart.length;
               /* $cookies.putObject(cookieOptionService.cookieName, JSON.stringify(cart)
                    , {
                    expires: cookieOptionService.exp
                });*/

            }
            else
            {
               // console.log("Q++");
                cart[index].Quantity++;
               /* $cookies.putObject(cookieOptionService.cookieName, cart, {
                    expires: cookieOptionService.exp
                });
                */
            }
           

        }
        
        $window.sessionStorage.setItem(cookieOptionService.cookieName,angular.toJson(cart));
       
    }





});