function initMap() {
    // Create a map object and specify the DOM element for display.
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 56.8790044, lng: 14.8058522 },
        //698.655 m / 2292.176 feet
        scrollwheel: true,
        zoom: 15
    });
    var geocoder = new google.maps.Geocoder();
    //var myLatLng = { lat: 56.8790044, lng: 14.8058522 };
    //var marker = new google.maps.Marker({
    //    position: myLatLng,
    //    map: map,
    //    title: 'Our lampshop'
    //});
    var address = 'Fagrabäcksvägen 18, 352 40 Växjö, Sverige';
    google.maps.event.trigger(map, 'resize');
    if (geocoder) {
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
                    map.setCenter(results[0].geometry.location);

                    var infowindow = new google.maps.InfoWindow(
                        {
                            content: '<b>' + address + '</b>',
                            size: new google.maps.Size(150, 50)
                        });

                    var marker = new google.maps.Marker({
                        position: results[0].geometry.location,
                        map: map,
                        title: address
                    });
                    google.maps.event.addListener(marker, 'click', function () {
                        infowindow.open(map, marker);
                    });

                } else {
                    alert("No results found");
                }
            } else {
                alert("Geocode was not successful for the following reason: " + status);
            }
        });
    }
}


    