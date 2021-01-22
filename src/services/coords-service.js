const {
    calculateDirectionBetweenTwoCoords,
    calculateDestinationPoint
} = require('../utils/coords-math');
const Coord = require('../models/Coord');

const calculateDirectionBetweenTwoCoordsService = (COORDS) => {
    const previousCoord = new Coord(COORDS[0].latitude, COORDS[0].longitude);
    const currentCoord = new Coord(COORDS[1].latitude, COORDS[1].longitude);
    return calculateDirectionBetweenTwoCoords(previousCoord, currentCoord);
}

const calculateSevenPointsService = (COORDS) => {

    const POINTS = [];
    const bearing = calculateDirectionBetweenTwoCoordsService(COORDS);
    const point0 = new Coord(COORDS[1].latitude, COORDS[1].longitude)

    POINTS.push(point0);
    POINTS.push(calculateDestinationPoint(point0, bearing - 15, 15));
    POINTS.push(calculateDestinationPoint(point0, bearing, 15));
    POINTS.push(calculateDestinationPoint(point0, bearing + 15, 15));
    POINTS.push(calculateDestinationPoint(point0, bearing - 15, 50));
    POINTS.push(calculateDestinationPoint(point0, bearing, 50));
    POINTS.push(calculateDestinationPoint(point0, bearing + 15, 50));

    return POINTS;
}

module.exports = {
    calculateDirectionBetweenTwoCoordsService,
    calculateSevenPointsService
}