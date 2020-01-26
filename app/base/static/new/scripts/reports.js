/* Call api to fetch device and user details as well as analytics
url = '';

axios.get(url).then(function (response) {
    // console.log(response);
    // Handle response data
})
.catch(function (error) {
    console.log(error);
});
*/
var myGeocode = {{tank_levels[0]}};

data = [
  {
      "name":"Oxfam",
      "DOR":"13-04-2019",
      "Device Data":[
          {
              "Device ID": "24D700",
              "Location": "-1.260883,36.853642",
              "Water level":"5%",
              "Monthly Supply":"34,066",
              "Monthly Consumption":"35,423"
          },
          {
              "Device ID": "24E2FF",
              "Location":"-1.263505,36.8562817",
              "Water level":"4%",
              "Monthly Supply":"23,066",
              "Monthly Consumption":"23,211"
          },
          {
              "Device ID": "868259027622409",
              "Location":"-1.263218,36.856917",
              "Water level":myGeocode,
              "Monthly Supply":"24,434",
              "Monthly Consumption":"22,323"
          },
          {
              "Device ID": "24D645",
              "Location":" -1.260917,36.862946",
              "Water level":"0%",
              "Monthly Supply":0.0,
              "Monthly Consumption":0.0
          },
          {
              "Device ID": "865905021074723",
              "Location":" -1.260417,36.86321",
              "Water level":"0%",
              "Monthly Supply":0.0,
              "Monthly Consumption":0.0
          }
      ]
  },



];

// console.log(data);

// Initialize table columns, then loop through data keys to obtain column names
var columns = new Array();
columns = columns = ['User', 'DoR', 'Device Data'];

// Create Table
var empTable = document.createElement('table');
empTable.setAttribute('id', 'empTable');
empTable.setAttribute('class', 'table table-bordered');

var thead = document.createElement('thead');
thead.setAttribute('class', 'thead-light');
empTable.appendChild(thead);

var tr = empTable.insertRow(-1);

// Table header(columns)
for (var h = 0; h < columns.length; h++) {
  var th = document.createElement('th');
  th.innerHTML = columns[h];
  tr.appendChild(th);
}

thead.appendChild(tr);

var div = document.getElementById('cont');
div.appendChild(empTable);

// Table body
var tbody = document.createElement('tbody');
empTable.appendChild(tbody);

// Loop through the Users
for(i = 0;i < data.length; i++) {
  // Create a new row for each user
  var empTab = document.getElementById('empTable');
  var rowCnt = empTab.rows.length;
  var tr = empTab.insertRow(rowCnt);
  tr = empTab.insertRow(rowCnt);

  // Insert User name and date of registration cells for that user
  // User name cell
  var userTd = document.createElement('td');
  userTd = tr.insertCell(0);
  userTd.innerHTML = data[i]['name'];

  // User DOR 
  var dateTd = document.createElement('td');
  dateTd = tr.insertCell(1);
  dateTd.innerHTML = data[i]['DOR'];

  // Create a device data cell and create a new table within it
  var dataTd = document.createElement('td');
  dataTd = tr.insertCell(2);

  // Device data table columns
  var dataColumns = new Array();
  dataColumns = ['Device ID', 'Location', 'Water Level', 'Monthly Supply', 'Monthly Consumption'];

  // The table
  var dataTable = document.createElement('table');
  dataTable.setAttribute('id', 'dataTable' + i);
  dataTable.setAttribute('class', 'table table-bordered');

  // The data table header
  var thead = document.createElement('thead');
  thead.setAttribute('class', 'thead-light');
  dataTable.appendChild(thead)

  var tr = dataTable.insertRow(-1);

  for (var h = 0; h < dataColumns.length; h++) {
      var th = document.createElement('th');
      th.innerHTML = dataColumns[h];
      tr.appendChild(th);
  }

  thead.appendChild(tr);

  dataTd.appendChild(dataTable);

  // Table body
  var tbody = document.createElement('tbody');
  dataTable.appendChild(tbody);

  // Loop through the device collections for auser and add a row for each device
  deviceData = data[i]['Device Data'];
  // console.log(deviceData);
  for(j = 0;j < deviceData.length; j++) {
      var dataTable = document.getElementById('dataTable' + i);

      // insert row
      var rowCnt = dataTable.rows.length;
      var tr = dataTable.insertRow(rowCnt);
      tr = dataTable.insertRow(rowCnt);

      // insert cells at each row
      // Device id
      var idTd = document.createElement('td');
      idTd = tr.insertCell(0);
      var idLink = document.createElement('a');
      idLink.setAttribute('href', 'https://www.google.com');
      idLink.innerHTML = deviceData[j]['Device ID'];
      idTd.appendChild(idLink);

      // Location
      var locTd = document.createElement('td');
      locTd = tr.insertCell(1);
      locTd.innerHTML = deviceData[j]['Location'];

      // Level
      var levelTd = document.createElement('td');
      levelTd = tr.insertCell(2);
      levelTd.innerHTML = deviceData[j]['Water level'];

      // Supply
      var supplyTd = document.createElement('td');
      supplyTd = tr.insertCell(3);
      supplyTd.innerHTML = deviceData[j]['Monthly Supply'];

      // Consumption
      var consumptionTd = document.createElement('td');
      consumptionTd = tr.insertCell(4);
      consumptionTd.innerHTML = deviceData[j]['Monthly Consumption'];
  }
}