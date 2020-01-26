/*
    APIs to fetch all data
*/

// set token
let token = '12345678';
let authStr = 'Bearer'.concat(token);

// set base urls
let baseAnalyticsUrl = 'http://35.188.78.226/';
let baseDataUrl = 'http://35.239.191.206/';

/* Call Billing API */
//axios.get(url, { headers: { Authorization: authStr } })
axios.get("http://0caccfd4.ngrok.io/billing/A?deviceid=SensTag_8_24E18C")
.then(response => {
    data = response.data;
    //Fetch the month and and the total billing
    month = data['Month'];
    total = data['monthly_total'];

    //Update month and total on billing card to the returned month and its total
    document.getElementById("month").innerHTML = month;
    document.getElementById("billestimate").innerHTML = "Ksh " + total;

    /*Check whether weekly totals are available and assign them to the billing card;
        else don't display the cards.
    */

    if(data.hasOwnProperty('Week 1')) {
        week1_total = data['Week 1'];
        document.getElementById("week1-estimate").innerHTML = "Ksh " + 1000;
    }
    else {
        document.getElementById("week1-container").style.display = "None";
    }

    if(data.hasOwnProperty('Week 2')) {
        week2_total = data['Week 2'];
        document.getElementById("week2-estimate").innerHTML = "Ksh " + week2_total;
    }
    else {
        document.getElementById("week2-container").style.display = "None";
    }

    if(data.hasOwnProperty('Week 3')) {
        week3_total = data['Week 3'];
        document.getElementById("week3-estimate").innerHTML = "Ksh " + week3_total;
    }
    else {
        document.getElementById("week3-container").style.display = "None";
    }

    if(data.hasOwnProperty('Week 4')) {
        week4_total = data['Week 4'];
        document.getElementById("week4-estimate").innerHTML = "Ksh " + week4_total;
    }
    else {
        document.getElementById("week4-container").style.display = "None";
    }
})
.catch((error) => {
    //console.log(error)
});


/* Call water level api for current fill level  */
level_url = "http://35.188.78.226/level?deviceid=SensTag_8_24E140";
axios.get(level_url)
.then(response => {
    //Extract the response data
    data = response.data;
    // Check if water level is available
    if(data.hasOwnProperty('Water_level')) {
        // Extract the level and assign it to current fill level.
        level = data['Water_level'];
        document.getElementById('current-fill').innerHTML = level + "L.";
    }
})
.catch((error) => {
    //Display error
});


/* Call daily api for average consumption and supply  */
daily_url = "http://35.188.78.226/daily/2018-10-05?deviceid=SensTag_8_24E140";
axios.get(daily_url)
.then(response => {
    //Extract the response data
    data = response.data;
    // Check if consumption is available
    if(data.hasOwnProperty('Consumption')) {
        // Extract the consumption data and assign it to avg daily usage.
        consumption = data['Consumption'];
        document.getElementById('avg-daily-usage').innerHTML = consumption + "L.";
    }
    else {
        // display not available
        document.getElementById('avg-daily-usage').innerHTML = "Unavailable";
    }

    // Check if supply is available
    if(data.hasOwnProperty('Supply')) {
        // Extract the supply data and assign it to avg daily supply.
        supply = data['Supply'];
        document.getElementById('avg-daily-supply').innerHTML = supply + "L.";
    }
    else {
        // display not available
        document.getElementById('avg-daily-supply').innerHTML = "Unavailable";
    }
})
.catch((error) => {
    //Display error
});

/* Analytic charts */
/* Doughnut chart */

var donutchart = document.getElementById("doughnutchart").getContext("2d");

//Chart data
var donutData = {
    labels: ["Consumed", "Remaining"],
    datasets: [
      {
        label: "Consumption data",
        data: [48, 52],
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
    data: [80, 59, 75],
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
    data: [75, 15, 60],
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
  labels: ["February", "March", "April"],
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
    labels: [ "February", "March", "April"],
    datasets: [
      {
        label: "Supply",
        data: [60, 50, 4],
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
        data: [20, 35, 1],
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
          zoom: 14,
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
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
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
          center:  {lat: -1.271394, lng: 36.766540}
        });

        // Create an array of alphabetical characters used to label the markers.
        var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';


        var locations = [
                            {lat: -1.271394, lng: 36.766540}
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