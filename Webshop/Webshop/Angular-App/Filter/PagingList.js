
app.filter("PaginList", function () {
    return function (data, pageNumber, numberOfItem,pageListButton) {
       // pageNumber = 2;
        // numberOfItem = 5;
        pageListButton = [];
        
        
        var numberOfPages = Math.ceil(data.length / numberOfItem);
        var start = pageNumber * numberOfItem;
        start = +start; //Pars to int
        for (var i = 1; i <= numberOfPages; i++)
        {
            pageListButton[i-1] = 'Page' + i;
        }
        console.log(pageListButton);
        if (pageNumber > 0 && pageNumber < numberOfPages) {
            return data.slice(start, start + numberOfItem);
            
        }
        
        else if (pageNumber === numberOfPages) {
            return data.slice(start);
        }
        
        return data;
    }
});