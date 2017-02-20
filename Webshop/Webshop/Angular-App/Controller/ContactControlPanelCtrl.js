
'use strict'
app.controller('ContactControlPanelCtrl', function ($window, $scope, $http) {

    $scope.contact = "Contact information ";
    $scope.contactInformations = {};
    $http.get("/Contact/GetContactInformations", { cache: false }).then(function (response) {
        angular.copy(response.data, $scope.contactInformations);
        

    }

    );
    $scope.save = function () {
        var promise = $http({
            method: 'POST',
            url: "/Contact/EditContactInformations",
            data: $scope.contactInformations,
        });
        promise.success(function (response) {
            toaster.pop('success', "success", "Contact Information Updated Successfully");

        }).error(function (error) {
            toaster.pop('error', "Error", "Erro");
            //toaster.pop('warning', "title", "text");
            //toaster.pop('note', "title", "text");

        });
    };

}
);