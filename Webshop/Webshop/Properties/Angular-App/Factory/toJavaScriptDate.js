app.factory('toJavaScriptDate', function () {

    var factory = function (date) {
        if (date != undefined && date != null) {
            var pattern = /Date\(([^)]+)\)/;
            var results = pattern.exec(date);
            var dt = new Date(parseFloat(results[1]));
            return dt;
        }
        else {
            return date;
        }

    }

    return factory;
});