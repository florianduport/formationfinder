/**
 * Created by XPS15 on 07/07/2016.
 */
function initMap() {
    // France 37.9687578,-13.1477711
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: {lat: 48.864716, lng: 2.349014}

    });

    var marker = new google.maps.Marker({
        map: map,
        // Define the place with a location, and a query string.
        place: {
            location: {lat: 48.864716, lng: 2.349014},
            query: 'Google, Sydney, Australia'

        },
        // Attributions help users find your site again.
        attribution: {
            source: 'Google Maps JavaScript API',
            webUrl: 'https://developers.google.com/maps/'
        }
    });

    // Construct a new InfoWindow.
    var infoWindow = new google.maps.InfoWindow({
        content: 'Get click'

});

    // Opens the InfoWindow when marker is clicked.
    marker.addListener('click', function(event) {
        infoWindow.open(map, marker);
        var latitude = event.latLng.lat();
        var longitude = event.latLng.lng();
        console.log( latitude + ', ' + longitude );
        map.panTo(new google.maps.LatLng(latitude,longitude));
    });
}
/*
function pinpointResult(result) {
    var placeIcon = {
        url: result.icon,
        scaledSize: new google.maps.Size(30, 30)
    };
    var marker = new google.maps.Marker({
        map: map,
        position: result.geometry.location,
        icon: placeIcon    });
    map.setCenter(result.geometry.location);
    map.setZoom(16);
    google.maps.event.addListener(marker, 'click',
                      function() {
                          var popupContent = '<b>Name: </b> ' + result.name +   '<br/>' + '<b>Vicinity: </b>' + result.vicinity;
                          popup.setContent(popupContent);        popup.open(map, this);    });
    markers.push(marker);
    }
// France 37.9687578,-13.1477711
window.onload = function(){
    var options = {
        zoom: 8
        , center: new google.maps.LatLng(37.968, -13.147)
        , mapTypeId: google.maps.MapTypeId.SATELLITE

        , backgroundColor: '#ffffff'
        , noClear: true
        , disableDefaultUI: true
        , keyboardShortcuts: false
        , disableDoubleClickZoom: true
        , draggable: false
        , scrollwheel: false
        , draggableCursor: 'move'
        , draggingCursor: 'move'

        , mapTypeControl: true
        , mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_MENU
            , position: google.maps.ControlPosition.TOP_LEFT
            , mapTypeIds: [
                google.maps.MapTypeId.SATELLITE
            ]
        }
        , navigationControl: true
        , streetViewControl: true
        , navigationControlOptions: {
            position: google.maps.ControlPosition.TOP_RIGHT
            , style: google.maps.NavigationControlStyle.ANDROID
        }
        , scaleControl: true
        , scaleControlOptions: {
            position: google.maps.ControlPosition.TOP_LEFT
            , style: google.maps.ScaleControlStyle.DEFAULT
        }
    };

    var map = new google.maps.Map(document.getElementById('map'), options);

   /!* map.setOptions({
        zoom: 10
        , center: new google.maps.LatLng(37.968, -13.147)
        , mapTypeId: google.maps.MapTypeId.TERRAIN

        , keyboardShortcuts: true
        , disableDoubleClickZoom: false
        , draggable: true
        , scrollwheel: true
        , draggableCursor: 'hand'
        , draggingCursor: 'hand'

        , mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
            , position: google.maps.ControlPosition.TOP_RIGHT
            , mapTypeIds: [
                google.maps.MapTypeId.ROADMAP
                , google.maps.MapTypeId.SATELLITE
            ]
        }

        , navigationControlOptions: {
            position: google.maps.ControlPosition.TOP_LEFT
            , style: google.maps.NavigationControlStyle.ZOOM_PAN
        }

        , scaleControlOptions: {
            position: google.maps.ControlPosition.BOTTOM_LEFT
            , style: google.maps.ScaleControlStyle.DEFAULT
        }
    });

    map.setZoom(9);
    var zoomLevel = map.getZoom();


    map.setCenter(new google.maps.LatLng(37.968, -13.147));
    var centerOfMap = map.getCenter();

    map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
    var mapTypeIdOfMap = map.getMapTypeId();

    var infowindow = null;

    google.maps.event.addListener(map, 'click', function(e) {
        if (infowindow != null)    infowindow.close();
        infowindow = new google.maps.InfoWindow({    content: '<b>Mouse Coordinates : </b>       <br><b>Latitude : </b>' + e.latLng.lat() + '       <br><b>Longitude: </b>' + e.latLng.lng(),    position: e.latLng  });
                                                     infowindow.open(map); });
    var markers;
    var popup;

    markers = new Array();
    popup = new google.maps.InfoWindow();*!/

    /!*var searchDiv =      document.getElementById('autocomplete_searchField'); map.controls[google.maps.ControlPosition.TOP_CENTER].push(     searchDiv);
    var searchField =      document.getElementById('autocomplete_searchField');

    var searchOptions = {
        bounds: new google.maps.LatLngBounds(
            new google.maps.LatLng(8.54, 17.33),
            new google.maps.LatLng(39.67, 43.77)    ),
            types: new Array() };

    var autocompleteSearch = new      google.maps.place.Autocomplete(searchField,         searchOptions);

    google.maps.event.addListener(autocompleteSearch,  'place_changed', function() {

        while(markers[0]) {    markers.pop().setMap(null); }

        var place = autocompleteSearch.getPlace();
        if (place) {
            if (place.geometry) {    pinpointResult(place); }
        }
    });*!/


    // alert(zoomLevel + ' -- ' + centerOfMap + ' -- ' + mapTypeIdOfMap);
};*/
