const BASE_URL = 'localhost';
// const BASE_URL = 'https://navaid-app.herokuapp.com';

// ====================================================
const COORDS = [];

let previousCoord, currentCoord = {
    accuracy: 0,
    latitude: 0,
    longitude: 0
}

COORDS.push(previousCoord);
COORDS.push(currentCoord);

if ('geolocation' in navigator) {
    setInterval(() => {
        getCoords(navigator);
    }, 30000);
} else {
    console.log('Geolocation is not available');
}

const getCoords = (navigator) => {
    navigator.geolocation.getCurrentPosition(curPos => {
        let currentPosition = {
            accuracy: curPos.coords.accuracy,
            latitude: curPos.coords.latitude,
            longitude: curPos.coords.longitude
        }
        COORDS.push(currentPosition);
        COORDS.shift();
        sendCoordsToServer(COORDS);
    });
}

const sendCoordsToServer = (COORDS) => {

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(COORDS)
    }
    console.log('Paso por aquí');
    fetch('/api/v1/coords', options).then(response => console.log(response));
}



// document.getElementById('acc').textContent = `Accuracy: ${currentPosition.coords.accuracy}`;
// document.getElementById('lat').textContent = `Latitude: ${currentPosition.coords.latitude}`;
// document.getElementById('lon').textContent = `Longitude: ${currentPosition.coords.longitude}`;