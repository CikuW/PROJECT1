/* All global vars */
/* Donut Chart data*/
var donutChart = new Vue({
    el: '#donutchart',
    data: {
        consumedVol: null,
        remVol: null,
    },
});

/* Property summary data*/
var propertySummary = new Vue({
    el: '#property-summary',
    data: {
        totalTanks: null,
        monitoredTanks: null,
        usagePerMonth: null,

    },
});

//Summary charts
var summaryCharts = new Vue({
    el: '#linechart',
    data: {
        timePeriod: [],
        consumptionDataArray: [],
        supplyDataArray: [],
    },
});

//Billing card
var Billing = new Vue({
    el: '#billestimate',
    data: {
        dates: [],
        bill: [],
    },
});

/* Device data per farm */
//Device locations
//Define the front end api url
var frontEndUrl = 'https://smaji.herokuapp.com/api/frontend/';
var deviceData = new Vue({
    el: '#device-status',
    data: {
        deviceId: null,
        lastSeen: null,
        farmName: null,
        locations: [],
        dailyUsage: null,
        supplyToday: null,
        dailySupply: null,
        consumptionToday: null,
        current_level: null,


    },

    created: function() {
        this.fetchDeviceData();
    },

    methods: {
        fetchDeviceData: function() {

        let deviceData = this;
            axios.get('https://smaji.herokuapp.com/api/devices/eric1').then(response => {

                this.deviceId = response.data.Public_id[0];
                this.current_level = response.data.current_level[0]
                var farms = ['Kwa Brown Farm'];
                this.farmName = farms[0];
                propertySummary.current_level = response.data.current_level[0];
                propertySummary.totalTanks = response.data.Devices;
                propertySummary.monitoredTanks = response.data.Devices;

                //Call the frontend api with device id
                axios.get(frontEndUrl + this.deviceId).then(response => {
                    this.dailyUsage = response.data.Average_daily_consumption;
                    this.supplyToday = response.data.Average_daily_supply;
                    propertySummary.usagePerMonth = response.data.Average_monthly_consumption;
                    donutChart.consumedVol = (response.data.Consumption_today);
                    donutChart.remVol = ((response.data.Supply_today) - (response.data.Consumption_today));
                })
                .catch(error => {
                    console.log(error);
                })

                 //Call the billing api with zoneing info
                axios.get("https://smaji.herokuapp.com/api/billing/C").then(response => {
                    var date_list= response.data.dates;
                    var bill_list = response.data.bill;

                   for (i = 0;i < date_list.length;i++) {
                        var start_end = date_list[i].split("    ");
                        var matching_bills = bill_list[i]
                        bills = [start_end[0],start_end[1]];
                        Billing.dates.push(bills);
                        Billing.bill.push(matching_bills);
                    }
                })
                .catch(error => {
                    console.log(error);
                })

                //End of front end api
                this.lastSeen = response.data.last_seen[0];
                tanks = response.data.Devices;
                tanksMonitored = response.data.Devices;
                var i;
                for (i = 0;i < response.data.Location.length;i++) {
                    //
                    var location_string = response.data.Location[i];
                    var latLong = location_string.split(",");
                    var latitude = parseFloat(latLong[0]);
                    var longitude = parseFloat(latLong[1]);
                    var uniPosition = [farms[i], latitude, longitude, response.data.Public_id[i],response.data.last_seen[i], 3, 5,response.data.current_level[i]];
                    this.locations.push(uniPosition);
                    /*var locations = [
      ['Wamberes Farm', -1.038855, 37.075680,deviceId,lastSeen,5,5],
      ['Kwa Brown Farm', -1.083823, 37.010788,'775d1f3e-0139-4391-9493-21c7eb58b831 ',' 2018-10-18T12:53:08.771Z',7,3],
    ];*/
                }
            })
            .catch(error => {
                console.log(error);
            })
        }
    }
});

/* donut chart and Line chart */

      google.charts.load("current", {packages:["corechart"]});

      google.charts.setOnLoadCallback(
      //Anonymous function to draw different charts
        function() {
          drawDonutChart();
          //drawLineChart();
        }
      );

      //Draw donut chart for specific device anayltic

      function drawDonutChart() {
        var data = google.visualization.arrayToDataTable([
          ['Status', 'Number'],
          ['Remaining',     donutChart.consumedVol],
          ['Consumed',      donutChart.remVol]
        ]);

        var options = {
          pieHole: 0.7,
          legend: {position: 'bottom'},
          slices: {0: {color: 'blue'}, 1:{color: '#2bb673'}},
         pieSliceText: 'none',
        };

        var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
        chart.draw(data, options);
      }



      //Draw line chart for specific device anayltic

      function drawLineChart() {
        var data = google.visualization.arrayToDataTable([
          ['timePeriod',       summaryCharts.consumptionDataArray],
          ['consumptionDataArray',     summaryCharts.consumptionDataArray],
          ['supplyDataArray',    summaryCharts.supplyDataArray]
        ]);

        var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
        chart.draw(data, options);
      }



//Google map
function initMap() {

  var center = {lat: -1.097900, lng: 37.011476};

  var locations = deviceData.locations;
 var locations = deviceData.locations;

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
/*
    var latlngbounds = new google.maps.LatLngBounds();

            for (var i = 0; i < locations.length; i++) {
                latlngbounds.extend(new google.maps.LatLng(locations[i][1],locations[i][2]));
            }
            map.fitBounds(latlngbounds); */

    var map = new google.maps.Map(document.getElementById('map'), map_options);

    var marker, i;






      for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map,
            animation: google.maps.Animation.DROP,
            customFarm: locations[i][0],
            customWaterLevel : locations[i][7],
            customId: locations[i][3],
            customLastSeen: locations[i][4],
            customConsumed: locations[i][5],
            customRem: locations[i][6]
        });

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                deviceData.farmName = this.customFarm;

                deviceData.deviceId = this.customId;
                //Call the frontend api with device id
                axios.get(frontEndUrl + this.customId).then(response => {
                    deviceData.dailyUsage = response.data.Average_daily_consumption;
                    deviceData.supplyToday = response.data.Average_daily_supply;
                    propertySummary.usagePerMonth = response.data.Average_monthly_consumption;
                    donutChart.consumedVol = (response.data.Consumption_today);
                    donutChart.remVol = ((response.data.Supply_today) - (response.data.Consumption_today));
                    drawDonutChart();
                })
                .catch(error => {
                    console.log(error);
                })
                deviceData.lastSeen = this.customLastSeen;
                deviceData.current_level = this.customWaterLevel;

                //donutChart.consumed = customConsumed;
                //donutChart.rem = customRem;

            }
          })(marker, i));
      }
    }

    //Display picked date
    function displayDate() {
        var pickedDate = document.getElementById("pickedDate").value;
        var pickedDate_delimited =pickedDate.replace(/ +/g, "-");
        var Day_delimited =pickedDate_delimited.replace(/\/+/g, "-");

        axios.get("https://smaji.herokuapp.com/api/chart/"+ deviceData.deviceId +"/"+ Day_delimited).then(response => {
        summaryCharts.timePeriod = response.data.dates;
        summaryCharts.consumptionDataArray = response.data.consumption_data;
        summaryCharts.supplyDataArray = response.data.supply_data;

        })
        .catch(error => {
          console.log(error);
         })

          var ctx = document.getElementById("linechart");
          var chart = new Chart(ctx,{
            type: "line",
            data: {
              labels: summaryCharts.timePeriod,
              datasets: [ {
                label: "Consumption",
				backgroundColor: "rgba(38, 185, 154, 0.31)",
				borderColor: "rgba(38, 185, 154, 0.7)",
				pointBorderColor: "rgba(38, 185, 154, 0.7)",
				pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
				pointHoverBackgroundColor: "#fff",
				pointHoverBorderColor: "rgba(220,220,220,1)",
                data: summaryCharts.consumptionDataArray
                },
                {
                label: "Supply",
                backgroundColor: "rgba(3, 88, 106, 0.3)",
                borderColor: "rgba(3, 88, 106, 0.70)",
                pointBorderColor: "rgba(3, 88, 106, 0.70)",
                pointBackgroundColor: "rgba(3, 88, 106, 0.70)",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(151,187,205,1)",
                data: summaryCharts.supplyDataArray
              }]
            }
          });


          var ctx1 = document.getElementById("barchart");
          var chart1 = new Chart(ctx1,{
            type: "bar",
            data: {
              labels: summaryCharts.timePeriod,
              datasets: [ {
                label: "Storage",
				backgroundColor: "rgba(38, 185, 154, 0.31)",
                data: summaryCharts.consumptionDataArray
                }]
            },
            options: {
                    hover: {
                        // Overrides the global setting
                        mode: 'index'
                    }
                }
          });
    }
