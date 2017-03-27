

app.controller('AboutUsControlPanelCtrl', function ($scope, $http) {


    $scope.data = {
        text: "hello"
    }

    $http.get("/About/GetAboutUsInformations", { cache: false }).then(function (response) {
        console.log(response.data.Content);
        //angular.copy(response.data.Content, $scope.data.text);
        $scope.data.text = response.data.Content;
       
    }

     );


    

    $scope.saveData=function()
    {
        console.log($scope.data.text);
        $http.post('About/EditAboutUsData', JSON.stringify({ data: $scope.data.text })).then(function (response) {

            console.log(data.text);
        });
    }

}
);