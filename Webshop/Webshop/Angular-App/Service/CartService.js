app.service('cartService', function ($window, cookieOptionService) {
    this.cartLength = 0;
    this.totalPrice = 0;
    this.counteTotalPriceQuantity = function () {
        this.cartLength = 0;
        this.totalPrice = 0;
        var cart=angular.fromJson($window.sessionStorage[cookieOptionService.cookieName]);

        if (cart === undefined || cart === null) {
            return;
        }
        else {
            for (var i = 0; i < cart.length; i++) {
                this.totalPrice += cart[i].Quantity * cart[i].Price;
                this.cartLength += cart[i].Quantity;
            }

        }
    }

    this.setCart=function(cart)
    {
        $window.sessionStorage.setItem(cookieOptionService.cookieName, angular.toJson(cart));
    }
    this.clearCart=function()
    {
        $window.sessionStorage.setItem(cookieOptionService.cookieName,null);
    }

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
               
                /* $cookies.putObject(cookieOptionService.cookieName, JSON.stringify(cart)
                     , {
                     expires: cookieOptionService.exp
                 });*/

            }
            else {
                cart[index].Quantity++;
                product.Quantity = cart[index].Quantity;
                
                /* $cookies.putObject(cookieOptionService.cookieName, cart, {
                     expires: cookieOptionService.exp
                 });
                 */
            }


        }
        
        $window.sessionStorage.setItem(cookieOptionService.cookieName,angular.toJson(cart));
        
    }

});