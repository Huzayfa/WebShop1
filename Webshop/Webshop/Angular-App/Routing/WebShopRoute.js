/// <reference path="../Template/Route/ProductCustomerAllDetailsPartialView.html" />
/// <reference path="../Template/Route/ProductCustomerAllDetailsPartialView.html" />
/// <reference path="../Template/RecommendedProducts.html" />
/// <reference path="../Template/RecommendedProducts.html" />
//(function()
//{
// var app = angular.module("WebShop", ["ngRoute"]);
app.config(function ($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "/Angular-App/Template/RecommendedProducts.html?"+new Date()

    }).when("/Users", {
        templateUrl: "/ShopUser/?" + new Date()
        // controller: "ShopUsersListCtrl"


    }
    ).when("/Products", {
        templateUrl: "/Product/"


    }).when("/Category", {
        templateUrl: "/Category/"
    }).when("/ShopCart", {
        templateUrl: "/ShopCart/"
    }).when("/ViewShopCart",
    {
        templateUrl: "/ShopCart/ViewShopCart"
    }).when("/Login", {
        templateUrl:"/Account/Login"
    }).when("/Orders", {
        templateUrl: "/Order/"
    }).when("/Register", {
        templateUrl: "/RegisterUser/"
    }).when("/Contact", {
        templateUrl: "/Contact/"
    }).when("/About", {
        templateUrl: "/About/"


    }).when("/ProductCustomerAllDetails/:productId", {
        templateUrl: "/Angular-App/Template/Route/ProductCustomerAllDetailsPartialView.html?",
        controller: "ProductCustomerAllDetailsCtrl"
    }).when("/OrderConfirm", {
        templateUrl: "/ShopCart/OrderConfirm/"

    }
    ).when("/AdminContact",
    {
        templateUrl: "/Contact/AdminContact/",

    }).otherwise({
        templateUrl:"",
        template: "<h1>Otherwise From Angular Route</h1>"
    });
}
    );
//}

//)();