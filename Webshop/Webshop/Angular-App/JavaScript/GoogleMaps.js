function initMap() {
    // Create a map object and specify the DOM element for display.
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 56.8790044, lng: 14.8058522 },
        //698.655 m / 2292.176 feet
        scrollwheel: true,
        zoom: 15
    });
    var myLatLng = { lat: 56.8790044, lng: 14.8058522 };
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Our lampshop'
    });
    google.maps.event.trigger(map, 'resize');
}


    