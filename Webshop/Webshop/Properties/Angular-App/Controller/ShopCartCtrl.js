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
    $http.get("/Product/Products", { cache: false }).then(function (response) {

        angular.copy(response.data, $scope.productsList);
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
            product.Quantity = 1;
            cart = [product];
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
                product.Quantity = 1;
                cart.push(product);
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
        console.log(cart);
        $window.sessionStorage.setItem(cookieOptionService.cookieName,angular.toJson(cart));
        console.log($window.sessionStorage);
        console.log($window.sessionStorage[cookieOptionService.cookieName]);
    }





});