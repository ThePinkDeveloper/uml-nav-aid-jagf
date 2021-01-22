const Coord = require('../models/Coord');

const calculateDistanceBetweenTwoCoords = (previousCoord, currentCoord) => {

    const R = 6372.795477598; // Radius of the earth in km
    const LATA = deg2rad(previousCoord.lat); // Vertical
    const LATB = deg2rad(currentCoord.lat); // Vertical
    const LONA = deg2rad(previousCoord.lon); // Horizontal
    const LONB = deg2rad(currentCoord.lon); // Horizontal

    // Calculo distancia (A, B)
    // Dist = R * arccos( sin(LATA) * sin(LATB) + cos(LATA) * cos(LATB) * cos(LONA - LONB))

    const a = Math.sin(LATA) * Math.sin(LATB)
    const b = Math.cos(LATA) * Math.cos(LATB) * Math.cos(LONA - LONB);
    const c = Math.acos(a + b);
    return c * R;
}

const calculateDirectionBetweenTwoCoords = (previousCoord, currentCoord) => {

    const LATA = deg2rad(previousCoord.lat);
    const LATB = deg2rad(currentCoord.lat);
    const LONA = deg2rad(previousCoord.lon);
    const LONB = deg2rad(currentCoord.lon);

    // To determine the direction from the starting point between two points on the earth, 
    // use the following formula:
    // Δφ = ln( tan( latB / 2 + π / 4 ) / tan( latA / 2 + π / 4) )
    // Δlon = abs( lonA - lonB )
    // θ = atan2( Δlon ,  Δφ )

    const dFi = Math.log(Math.tan(LATB / 2 + Math.PI / 4) / Math.tan(LATA / 2 + Math.PI / 4));
    const dLon = Math.abs(LONA - LONB);
    bearing = rad2deg(Math.atan2(dFi, dLon)) - 90;
    if (bearing < 0) bearing += 360;
    if (bearing == 360) bearing = 0;
    return bearing
}

const calculateDestinationPoint = (currentCoord, bearing, distance) => {

    const R = 6372.795477598; // Radius of the earth in km
    const LATA = deg2rad(currentCoord.lat);
    const LONA = deg2rad(currentCoord.lon);

    // To determine the destination point, knowing the starting point the direction θ and the distance d, 
    // we use the following formula:

    // latB = asin( sin( latA) * cos( d / R ) + cos( latA ) * sin( d / R ) * cos( θ ))
    // lonB = lonA + atan2(sin( θ ) * sin( d / R ) * cos( latA ), cos( d / R ) − sin( latA ) * sin( latB ))

    const headingRads = deg2rad(bearing);
    const LATB = Math.asin(Math.sin(LATA) * Math.cos(distance / R) +
        Math.cos(LATA) * Math.sin(distance / R) * Math.cos(headingRads));
    const LONB = LONA +
        Math.atan2(Math.sin(headingRads) * Math.sin(distance / R) * Math.cos(LATA),
            Math.cos(distance / R) - Math.sin(LATA) * Math.sin(LATB));

    const destination = new Coord(rad2deg(LATB), rad2deg(LONB));

    return destination;

}

const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
}

const rad2deg = (rad) => {
    return rad * (180 / Math.PI);
}

module.exports = {
    calculateDistanceBetweenTwoCoords,
    calculateDirectionBetweenTwoCoords,
    calculateDestinationPoint
}