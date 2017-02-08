﻿
'use strict'
app.controller('OrderControlPanelListCtrl', function ($window, $scope, $http, $timeout, orderServices) {
    $scope.ordersList = orderServices.getOrdersList();
    $scope.selectOrderBy = function (select) {
        $scope.selectedOrder = select;
    };

    $scope.editSelected = false;
    $scope.detailsSelected = false;
    $scope.selectedOrderEditId = " ";
    $scope.selectedOrderDetails = " ";

    var findInList = function (list, Id) {

        for (var i = 0; i < list.length; i++) {
            if (Id == list[i].Id) {

                return i;
            }
        }

        return -1;

    }

    $scope.cancelEdit = function (orderId) {
        $scope.editSelected = false;
        $scope.detailsSelected = false;
        $scope.selectedOrderEditId = " ";
        $scope.selectedOrderDetails = " ";
    }


    $scope.DeleteOrder = function (orderId) {
        var deleteOrder = $window.confirm('Are you sure you want to delete?');
        if (deleteOrder) {
            orderServices.DeleteOrder(orderId);
            var index = orderServices.findOrderInList(orderId, $scope.ordersList);
            if (index > -1) {
                $scope.ordersList.splice(index, 1);
            }
        }
    };

    $scope.DeleteOrderRow = function (orderRowId) {
        var deleteOrderRow = $window.confirm('Are you sure you want to delete this row?');
        if (deleteOrderRow)
        {
            orderServices.DeleteOrderRow(orderRowId);
            var index = findInList($scope.selectedOrder.orderProducts,orderRowId);
            if(index>-1)
            {
                $scope.selectedOrder.orderProducts.splice(index, 1);
            }
        }
    };

    $scope.UpdateOrderRow = function (row) {
        orderServices.UpdateOrderRow(row).then(function () { 
            $scope.selectedOrder = orderServices.getOrderDetails($scope.selectedOrder.Id);
          //  console.log($scope.selectedOrderEditId);
            var index = findInList($scope.ordersList, $scope.selectedOrder.Id);
            if(index>-1)
            {
                angular.copy($scope.selectedOrder.TotalPrice, $scope.ordersList[index].TotalPrice);
            }
          //  console.log(index);
            console.log($scope.selectedOrder);
            console.log($scope.ordersList);

        });
       
    };




    //get order By Id to Edit it
    $scope.EditOrder = function (orderId) {
        $scope.selectedOrder = orderServices.getOrderDetails(orderId);
        $scope.editSelected = true;
        $scope.detailsSelected = false;
        $scope.selectedOrderEditId = angular.copy(orderId);
    }

    $scope.saveEditOrder = function (order) {
        orderServices.saveEditOrder(order);
        var index = orderServices.findOrderInList(order.Id, $scope.ordersList);
        if (index > -1) {
            orderServices.copyOrder(order, $scope.ordersList[index]);
        }
        var modal = $("#editOrderModal");
        if (modal != undefined) {
            modal.modal('hide');
        }
        $scope.editSelected = false;
        $scope.detailsSelected = false;
        $scope.selectedOrderEditId = " ";
        $scope.selectedOrderDetails = " ";
    }

    $scope.getOrderDetails = function (orderId) {
        $scope.selectedOrder = {};

        $scope.selectedOrder=orderServices.getOrderDetails(orderId);
        $scope.selectedOrderDetails = angular.copy(orderId);
        $scope.selectedOrderEditId = "";

        $scope.editSelected = false;
        $scope.detailsSelected = true;
    }

}
);