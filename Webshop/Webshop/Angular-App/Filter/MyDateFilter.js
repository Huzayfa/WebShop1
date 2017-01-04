app.filter('toJavaScriptDate', function () {
    return function (date, val1) {
        console.log(date);
        //console.log(val1);
        
        if (date != undefined && date != null)
        {
            var pattern = /Date\(([^)]+)\)/;
            var results = pattern.exec(date);
            var dt = new Date(parseFloat(results[1]));
            return dt;
        }
        else
        {
            return date;
        }
       
    };
});


