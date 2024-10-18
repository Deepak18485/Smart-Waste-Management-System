// Complaint submission
function submitComplaint() {
    const complaint = document.getElementById('complaintBox').value;
    if (complaint) {
        alert('Complaint submitted: ' + complaint);
        // Here you would typically send the complaint to the server
        fetch('/submitComplaint', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ complaint })
        })
        .then(response => response.json())
        .then(data => alert(data.message));
    } else {
        alert('Please enter a complaint before submitting.');
    }
}

// Share location
function shareLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById('locationStatus').innerText = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    document.getElementById('locationStatus').innerText = 
    "Location shared! Latitude: " + position.coords.latitude + 
    ", Longitude: " + position.coords.longitude;
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById('locationStatus').innerText = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById('locationStatus').innerText = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            document.getElementById('locationStatus').innerText = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById('locationStatus').innerText = "An unknown error occurred.";
            break;
    }
}

// Waste collection schedule prediction
function getCollectionSchedule() {
    fetch('/collectionSchedule')
    .then(response => response.json())
    .then(data => {
        document.getElementById('scheduleStatus').innerText = data.schedule;
    });
}

// Analyze waste image
function analyzeWasteImage() {
    const fileInput = document.getElementById('wasteImage');
    if (fileInput.files.length > 0) {
        const formData = new FormData();
        formData.append('wasteImage', fileInput.files[0]);
        
        fetch('/analyzeWaste', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('segregationResult').innerText = data.message;
        });
    } else {
        alert('Please upload an image of waste.');
    }
}

// Show environmental impact dashboard
function showImpactDashboard() {
    fetch('/impactDashboard')
    .then(response => response.json())
    .then(data => {
        document.getElementById('impactDashboard').innerText = data.impact;
    });
}

// Track where waste goes
function trackWaste() {
    fetch('/trackWaste')
    .then(response => response.json())
    .then(data => {
        document.getElementById('wasteTracking').innerText = data.tracking;
    });
}

// Find nearest disposal points
function findNearestDisposal() {
    fetch('/disposalPoints')
    .then(response => response.json())
    .then(data => {
        document.getElementById('disposalPoints').innerText = data.points;
    });
}
