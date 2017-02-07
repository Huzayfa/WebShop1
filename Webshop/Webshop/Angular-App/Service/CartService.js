app.service('cartService', function ($window,cookieOptionService) {
    var cartLength = 0;


    this.getCartLength=function()
    {
        return cartLength;

    }

    var findProductInList = function (productId, productList) {
        for (var i = 0; i < productList.length; i++) {
            if (productId == productList[i].Id) {
                return i;
            }
        }
        return -1;
    }
   this.addToCart = function (product) {
        //$cookies.put('customerCart', undefined);
        var cart = angular.fromJson($window.sessionStorage[cookieOptionService.cookieName]);
        /*var cart = $cookies.getObject(cookieOptionService.cookieName);*/
        if (cart === undefined || cart === null) {
            //var p = {};
            //p.Id = angular.copy(product.Id);
            //p.Quantity = 1;
            //p.Price = angular.copy(product.Price)
            product.Quantity = 1;
            cart = [product];
            cartLength = 1;
            /* $cookies.putObject(cookieOptionService.cookieName,JSON.stringify(cart), {
                 expires: cookieOptionService.exp
             });
             
             $cookies.putObject(cookieOptionService.cookieName,cart,
                { expires: cookieOptionService.exp }
                 );
             */
        }
        else {
            var index = findProductInList(product.Id, cart)
            if (index == -1) {

                //var p = {};
                //p.Quantity = 1;
                //p.Id = angular.copy(product.Id);
                product.Quantity = 1;
                //p.Price = angular.copy(product.Price)
                cart.push(product);
                cartLength += 1;
                /* $cookies.putObject(cookieOptionService.cookieName, JSON.stringify(cart)
                     , {
                     expires: cookieOptionService.exp
                 });*/

            }
            else {
                cart[index].Quantity++;
                cartLength += 1;
                /* $cookies.putObject(cookieOptionService.cookieName, cart, {
                     expires: cookieOptionService.exp
                 });
                 */
            }


        }

        $window.sessionStorage.setItem(cookieOptionService.cookieName, angular.toJson(cart));
        return cartLength;
    }

});