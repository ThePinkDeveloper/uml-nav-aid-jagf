const express = require('express');
const weatherService = require('../services/weather-service');
const coordsService = require('../services/coords-service');

const app = express();
app.use(express.json());

app.post('/api/v1/coords', (request, response) => {
    const COORDS = request.body;
    const POINTS = coordsService.calculateSevenPointsService(COORDS);
    const WEATHER_DATA = weatherService.getDataForSevenPointsFromWeatherApiService(POINTS)
        .then((response) => {
            response.forEach(data => console.log(data.data.wind, data.data.name));
        });
    response = WEATHER_DATA;
    return response;

});

module.exports = app;