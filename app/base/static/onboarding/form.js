// Fill today's date in date field
todaysDate();

// API to fetch device details with the scanned ID
// Device ID is returned by the url contained in the QR_code.
device_id = ""
url = "http://www.app.smaji.ai/data/" + device_id;

// Function to autofill details.
function autofillDetails() {
    axios.get(url).then(function (response) {
        // Populate device fields with device data.
    }).catch(function (error) {
        //
        console.log(error);
    });
}

// Autofill today's date
function todaysDate() {
    var today = moment().format("YYYY-MM-DD");

    dateField = document.getElementById('date');
    dateField.setAttribute("value", today);
}



 

