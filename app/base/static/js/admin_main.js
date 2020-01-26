/* Analytic charts */
/* Doughnut chart */

var donutchart = document.getElementById("doughnutchart").getContext("2d");

//Chart data
var donutData = {
    labels: ["Consumed", "Remaining"],
    datasets: [
      {
        label: "Consumption data",
        data: [60, 40],
        backgroundColor: [
          "blue",
          "#2bb673"
        ],
      }
    ]
  };

  //chart options
  var donutOptions = {
    responsive: true,
    cutoutPercentage: 70,
    title: {
      display: false,
      position: "top",
      text: "Water Usage",
      fontSize: 18,
      fontColor: "#111"
    },
    legend: {
      display: true,
      position: "bottom",
      labels: {
        fontColor: "#333",
        fontSize: 12,
        boxWidth: 8,
        padding: 2
      }
    }
  };

  //Initialize the chart
  var drawDonutChart = new Chart(donutchart, {
    type: "doughnut",
    data: donutData,
    options: donutOptions
  });


 /* Line chart */
var linechart = document.getElementById("linecharts");

var supply = {
    label: "Supply",
    data: [0, 59, 75, 20, 20, 55, 40],
    lineTension: 0.3,
    fill: false,
    borderColor: 'blue',
    backgroundColor: 'transparent',
    pointBorderColor: 'blue',
    pointBackgroundColor: 'blue',
    pointRadius: 3,
    pointHoverRadius: 4,
    pointHitRadius: 10,
    pointBorderWidth: 2,
  };

var consumption = {
    label: "Consumption",
    data: [20, 15, 60, 60, 65, 30, 70],
    lineTension: 0.3,
    fill: false,
    borderColor: '#2bb673',
    backgroundColor: 'transparent',
    pointBorderColor: '#2bb673',
    pointBackgroundColor: '#2bb673',
    pointRadius: 3,
    pointHoverRadius: 4,
    pointHitRadius: 10,
    pointBorderWidth: 2
  };

var period = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [supply, consumption]
};

var lineChartOptions = {
  legend: {
    display: true,
    position: 'bottom',
    labels: {
      boxWidth: 30,
      fontColor: 'black'
    }
  }
};

var drawLineChart = new Chart(linechart, {
  type: 'line',
  data: period,
  options: lineChartOptions
});


/* Storage chart */
var barchart = document.getElementById("barcharts");

//bar chart data
  var barChartData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Supply",
        data: [10, 50, 25, 70, 40],
        backgroundColor: [
          "blue",
          "blue",
          "blue",
          "blue",
          "blue"
        ],
        borderColor: [
          "rgba(10,20,30,1)",
          "rgba(10,20,30,1)",
          "rgba(10,20,30,1)",
          "rgba(10,20,30,1)",
          "rgba(10,20,30,1)"
        ],
        borderWidth: 0
      },
      {
        label: "Consumption",
        data: [20, 35, 40, 60, 50],
        backgroundColor: [
          "#2bb673",
          "#2bb673",
          "#2bb673",
          "#2bb673",
          "#2bb673"
        ],
        borderColor: [
          "rgba(50,150,200,1)",
          "rgba(50,150,200,1)",
          "rgba(50,150,200,1)",
          "rgba(50,150,200,1)",
          "rgba(50,150,200,1)"
        ],
        borderWidth: 0
      }
    ]
  };

  //options
  var barChartOptions = {
    responsive: true,
    title: {
      display: false,
      position: "top",
      text: "Bar Graph",
      fontSize: 18,
      fontColor: "#111"
    },
    legend: {
      display: true,
      position: "bottom",
      labels: {
        fontColor: "#333",
        fontSize: 16
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          min: 0
        }
      }]
    }
  };

  //create Chart class object
  var chart = new Chart(barchart, {
    type: "bar",
    data: barChartData,
    options: barChartOptions
  });

  function initMap() {

        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 8,
          styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#ffffff'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },

            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ],

          center: {lat: -1.2683, lng:36.8111}
        });

        // Create an array of alphabetical characters used to label the markers.
        var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';


        var locations = [
        {lat: -1.1962, lng: 36.9487},
                            {lat: -1.271394, lng: 36.766540},
                            {lat: -1.279783, lng: 36.69049},
                            {lat: -1.200456, lng: 36.849831},
                            {lat: -1.262217, lng: 36.854933}


      ]


        // Add some markers to the map.
        // Note: The code uses the JavaScript Array.prototype.map() method to
        // create an array of markers based on a given "locations" array.
        // The map() method here has nothing to do with the Google Maps API.
        var markers = locations.map(function(location, i) {
          return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length]
          });
        });

        // Add a marker clusterer to manage the markers.
        var markerCluster = new MarkerClusterer(map, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
      }

$(function(){
    $("#form-total").steps({
        headerTag: "h2",
        bodyTag: "section",
        transitionEffect: "fade",
        enableAllSteps: true,
        stepsOrientation: "vertical",
        autoFocus: true,
        transitionEffectSpeed: 500,
        titleTemplate : '<div class="title">#title#</div>',
        labels: {
            previous : 'Back Step',
            next : '<i class="zmdi zmdi-arrow-right"></i>',
            finish : '<i class="zmdi zmdi-check"></i>',
            current : ''
        },
    })
});
