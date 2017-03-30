

app.controller('AboutUsControlPanelCtrl', function ($sce,$scope, $http) {


    $scope.data = {
        text: $sce.trustAsHtml("hello"),
    }


    

    $http.get("/About/GetAboutUsInformations", { cache: false }).then(function (response) {
        //angular.copy(response.data.Content, $scope.data.text);
        //$scope.data.text = $sce.trustAsHtml(response.data.Content);
        $scope.data.text =response.data.Content;
       
       
    }

     );


    

    $scope.saveData=function()
    {
        console.log($scope.data.text);
        $http.post('About/EditAboutUsData', JSON.stringify({ data: $scope.data.text })).then(function (response) {
 
        });
    }

}
);