function getCart() {
    var scope = angular.element(document.getElementById("cartInfo")).scope();
    //console.log(window.location.origin);

    var form = $('#ConfirmShoping');
    var token = $('input[name="__RequestVerificationToken"]', form).val();
    $.ajax({
        url: window.location.origin +'/ShopCart/IsLogedIn',
        type: 'Get',
        success: function (result , statusText,status) {

            console.log(status.status);
            $.ajax({
                url: form.attr('action'),
                type: 'POST',
                cashe:false,
                data: {

                    __RequestVerificationToken: token,
                    products: scope.cart
                },
                success: function (result) {
                    scope.clearShopCart();
                    if (!scope.$$phase) {
                        scope.$apply()
                    }
                },
                error: function (err) {
                    //console.log(err.);
                    //console.log("AJAX error in request: " + err);
                    //document.getElementById("")
                }

            });
        },
        error: function (err) {
            
            $("#ShowLoginModal").click();
        }

    });
    
    return false;
}
