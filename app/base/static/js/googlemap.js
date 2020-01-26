/*function initMap() {

  var center = {lat: -1.097900, lng: 37.011476};

    var locations = [
      ['Thika Town', -1.038855, 37.075680],
      ['Juja City', -1.083823, 37.010788],
      ['Ruiru Center', -1.148170,  36.962461],
      ['Karura Forest', -1.236352, 36.830337],
    ];

    var map_options = {
        center: center,
            zoom: 8,
            styles: [
                    {
                    "featureType": "landscape",
                    "stylers": [
                        {
                            "hue": "#FFBB00"
                        },
                        {
                            "saturation": 43.400000000000006
                        },
                        {
                            "lightness": 37.599999999999994
                        },
                        {
                            "gamma": 1
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "stylers": [
                        {
                            "hue": "#FFC200"
                        },
                        {
                            "saturation": -61.8
                        },
                        {
                            "lightness": 45.599999999999994
                        },
                        {
                            "gamma": 1
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "stylers": [
                        {
                            "hue": "#FF0300"
                        },
                        {
                            "saturation": -100
                        },
                        {
                            "lightness": 51.19999999999999
                        },
                        {
                            "gamma": 1
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "stylers": [
                        {
                            "hue": "#FF0300"
                        },
                        {
                            "saturation": -100
                        },
                        {
                            "lightness": 52
                        },
                        {
                            "gamma": 1
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "stylers": [
                        {
                            "hue": "#0078FF"
                        },
                        {
                            "saturation": -13.200000000000003
                        },
                        {
                            "lightness": 2.4000000000000057
                        },
                        {
                            "gamma": 1
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "stylers": [
                        {
                            "hue": "#00FF6A"
                        },
                        {
                            "saturation": -1.0989010989011234
                        },
                        {
                            "lightness": 11.200000000000017
                        },
                        {
                            "gamma": 1
                        }
                    ]
                }
            ],
          mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById('map'), map_options);

    var marker, i;

      for (i = 0; i <= locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map,
            animation: google.maps.Animation.DROP
        });

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                var device = document.getElementById('donutchart');

                //change device status and frequency
                var status = document.getElementById('deviceStatus');
                var freq = document.getElementById('deviceFrequency');
                status.innerHTML = "Device Status: Offline<br>";
                freq.innerHTML = "Device Frequency: 500Hz";
            }
          })(marker, i));
      }
    }*/