app.service('generalDataService', function ($window, $http,$q) {
    var dataLoaded = false;
    var Address = "";
    this.GetAddress = function () {
        var deferred = $q.defer();
        if (dataLoaded) {
            deferred.resolve(Address);
            return ;
        }
        else {
            $http.get("/Contact/GetAddress", { cache: false }).then(function (response) {
                angular.copy(response.data, Address);
                deferred.resolve(response.data);
                
                
            });
        }
        return deferred.promise;
    };

}
);