function initMap() {
    // Create a map object and specify the DOM element for display.
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 33.45020179, lng: 36.23596653 },
        //698.655 m / 2292.176 feet
        scrollwheel: true,
        zoom: 15
    });
    var myLatLng = { lat: 33.45020179, lng: 36.23596653 };
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Our First Branch'
    });
    google.maps.event.trigger(map, 'resize');
}


    