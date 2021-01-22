const axios = require('axios');
const privateKeysReader = require('../utils/private-keys-reader');

const API = privateKeysReader.getKey();
const URL = privateKeysReader.getUrl();
const MAX_POINTS_TO_CHECK_WHEATER = 7;

const getDataFromWeatherApiService = (coord) => {
    const instance = axios.create({
        baseURL: `${URL}?lat=${coord.lat}&lon=${coord.lon}&appid=${API}`
    });
    return instance.get();
}

const getDataForSevenPointsFromWeatherApiService = (points) => {
    const ARRAY_OF_OPERATIONS = [];
    for (let n = 0; n < MAX_POINTS_TO_CHECK_WHEATER; n++) {
        ARRAY_OF_OPERATIONS.push(getDataFromWeatherApiService(points[n]));
    }
    return Promise.all(ARRAY_OF_OPERATIONS);
}

module.exports = {
    getDataFromWeatherApiService,
    getDataForSevenPointsFromWeatherApiService
}