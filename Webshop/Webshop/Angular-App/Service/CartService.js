app.service('cartService', function ($window, cookieOptionService) {
    this.cartLength = 0;
    this.totalPrice = 0;

    this.clearCart=function()
    {
        $window.sessionStorage.setItem(cookieOptionService.cookieName,null);
        this.cartLength = 0;
        this.totalPrice = 0;
    }

    this.setCart = function (cart) {
        $window.sessionStorage.setItem(cookieOptionService.cookieName, angular.toJson(cart));
    };
    this.findProductInCart = function (cart, productId) {
        for (var i = 0; i < cart.length; i++) {
            if (cart[i].Id == productId) {
                return i;
            }
        }
        return -1;
    };
 
    var findProductInList = function (productId, productList) {
        for (var i = 0; i < productList.length; i++) {
            if (productId == productList[i].Id) {
                return i;
            }
        }
        return -1;
    };
    
    this.getCart = function () {
        var cart = angular.fromJson($window.sessionStorage[cookieOptionService.cookieName]);
        return cart ? cart : [];
    };


    this.addToCart = function (product) {
        //$cookies.putObject(cookieOptionService.cookieName, null);
        var cart = angular.fromJson($window.sessionStorage[cookieOptionService.cookieName]);
        /*var cart = $cookies.getObject(cookieOptionService.cookieName);*/
        if (cart === undefined || cart === null) {
            //var p = {};
            //p.Id = angular.copy(product.Id);
            //p.Quantity = 1;
            //p.Price = angular.copy(product.Price)
            product.Quantity = 1;
            cart = [product];
            this.cartLength = 1;
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
                this.cartLength += 1;
                /* $cookies.putObject(cookieOptionService.cookieName, JSON.stringify(cart)
                     , {
                     expires: cookieOptionService.exp
                 });*/

            }
            else {
                cart[index].Quantity++;
                product.Quantity = cart[index].Quantity;
                this.cartLength += 1;
                /* $cookies.putObject(cookieOptionService.cookieName, cart, {
                     expires: cookieOptionService.exp
                 });
                 */
            }


        }
        this.totalPrice += product.Price * product.Price;
        $window.sessionStorage.setItem(cookieOptionService.cookieName,angular.toJson(cart));
        return this.cartLength;
    }

});