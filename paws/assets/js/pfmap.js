$(function(){

/*  Google map Script
  ====================================================*/

function initMap() {


    var mapLatitude = 40.901498 ; // Google map latitude
    var mapLongitude = -74.040051 ; // Google map Longitude

    var myLatlng = new google.maps.LatLng( mapLatitude, mapLongitude );

    var mapOptions = {

            center: myLatlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoom: 15,
            scrollwheel: false
          };

    var map = new google.maps.Map(document.getElementById("contact-map"), mapOptions);

    var marker = new google.maps.Marker({

      position: myLatlng,
      map : map,

    });

    // To add the marker to the map, call setMap();
    marker.setMap(map);

    // Map Custom style
    var styles = [
    {
      stylers: [
        { hue: "#1f76bd" },
        { saturation: 80 }
      ]
    },{
      featureType: "road",
      elementType: "geometry",
      stylers: [
        { lightness: 80 },
        { visibility: "simplified" }
      ]
    },{
      featureType: "road",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    }
  ];

  map.setOptions({styles: styles});

};

if( $("#contact-map").length > 0 ) {

  initMap();

}

});
