﻿/// <reference path="../Template/RecommendedProducts.html" />
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
    }).when("/OrderLines", {
        templateUrl: "/OrderLines/"
    }).when("/Register", {
        templateUrl: "/RegisterUser/"

    }).otherwise({

        template: "<h1>Otherwise From Angular Route</h1>"
    });
}
    );
//}

//)();