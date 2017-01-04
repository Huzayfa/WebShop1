﻿//(function()
//{
// var app = angular.module("WebShop", ["ngRoute"]);
app.config(function ($routeProvider) {
    $routeProvider.when("/", {
        template: "<h1>Main Route Angular</h1>"

    }).when("/Users", {
        templateUrl: "/ShopUser/",
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
    }).otherwise({

        template: "<h1>Otherwise From Angular Route</h1>"
    });
}
    );
//}

//)();