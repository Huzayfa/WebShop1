app.service('orderServices', function ($http,$q, toJavaScriptDate) {

    this.getOrdersList = function () {
        var orderList = [];
        $http.get("/Order/Orders", { cache: false }).then(function (response) {
             for (var i = 0; i < response.data.length; i++) {
                 response.data[i].OrderDate = toJavaScriptDate(response.data[i].OrderDate);
                 response.data[i].DeliverDate = toJavaScriptDate(response.data[i].DeliverDate);
             }
            angular.copy(response.data, orderList);
        }
       );
        return orderList;
    }

    this.saveEditOrder = function (order) {

        $http.post('Order/Edit', order).then(function (response) {

        });
    }

    this.UpdateOrderRow = function (row) {
        
       return $http.post('Order/UpdateOrderRow', row).then(function (response) {

        });
    }



    this.getOrderDetails = function (orderId) {
        var order = {};
       // var promise = $q.defer();
        //$scope.selectedOrder = {};
      $http.post('Order/OrderDetails',{ orderId: orderId }).then(function (response) {
         

            response.data.OrderDate = toJavaScriptDate(response.data.OrderDate);
            response.data.DeliverDate = toJavaScriptDate(response.data.DeliverDate);
          //promise.resolve(response);
            angular.copy(response.data,order);
            
            
      });
      //return promise.promise;
      return order;
    };

    this.DeleteOrder = function (orderId) {

        $http.post('Order/Delete', JSON.stringify({ orderId: orderId })).then
        (function (response) {

        });
    }

    this.DeleteOrderRow = function (orderRowId) {

        $http.post('Order/DeleteRow', JSON.stringify({ orderRowId: orderRowId })).then
        (function (response) {

        });
    }


    this.copyOrder = function (sourceOrder, destinationOrder) {
        destinationOrder.Id = angular.copy(sourceOrder.Id);
        destinationOrder.TotalPrice = sourceOrder.TotalPrice;
        destinationOrder.OrderDate = angular.copy(sourceOrder.OrderDate);
        destinationOrder.DeliverDate = angular.copy(sourceOrder.DeliverDate);
    }

    this.findOrderInList = function (orderId, orderList) {
        for (var i = 0; i < orderList.length; i++) {
            if (orderId === orderList[i].Id) {
                return i;
            }
        }
        return -1;
    }
});