import { GarsLetters, GarsPrecision } from './gars-types';
interface LatLng {
  lat: number;
  lng: number;
}

/**
 *
 * @param {LatLng} ll - Lat/Lng dict.  Assumes that it has been normalized to -180/+180
 * @returns
 */
function _getQuadrant(ll: LatLng) {
  const HALF_DEGREE = 0.5; // The width of the 30 minute zone

  // Handle edge cases by subtracting half a degree
  const latitude = Math.abs(ll.lat) === 90 ? 89.5 : ll.lat;
  const longitude = Math.abs(ll.lng) === 180 ? 179.5 : ll.lng;

  // Round down to nearest half
  const latFloor = Math.floor(latitude / HALF_DEGREE) * HALF_DEGREE;
  const lngFloor = Math.floor(longitude / HALF_DEGREE) * HALF_DEGREE;

  const latDiff = ll.lat - latFloor;
  const lngDiff = ll.lng - lngFloor;

  const northHalf = latDiff > HALF_DEGREE / 2 ? true : false;
  const eastHalf = lngDiff > HALF_DEGREE / 2 ? true : false;

  if (northHalf && !eastHalf) {
    return '1';
  } else if (northHalf && eastHalf) {
    return '2';
  } else if (!northHalf && !eastHalf) {
    return '3';
  } else {
    return '4';
  }
}

function _getKeypad(ll: LatLng) {
  const QUARTER_DEGREE = 0.25;
  const latitude = Math.abs(ll.lat) === 90 ? 89.75 : ll.lat;
  const longitude = Math.abs(ll.lng) === 180 ? 179.75 : ll.lng;

  // Round to nearest quarter
  const latFloor = Math.floor(latitude / QUARTER_DEGREE) * QUARTER_DEGREE;
  const lngFloor = Math.floor(longitude / QUARTER_DEGREE) * QUARTER_DEGREE;

  const latDiff = ll.lat - latFloor;
  const lngDiff = ll.lng - lngFloor;

  // The keypad forms a 2d array.  From the SW corner, count the number of
  // indicies going up, and then right

  let verticalIndex = 0;
  let horizontalIndex = 0;

  const FIVE_MINUTES_IN_DEGREES = 0.25 / 3;

  if (latDiff > 2 * FIVE_MINUTES_IN_DEGREES) {
    verticalIndex = 2;
  } else if (latDiff > FIVE_MINUTES_IN_DEGREES) {
    verticalIndex = 1;
  } else {
    verticalIndex = 0;
  }

  if (lngDiff > 2 * FIVE_MINUTES_IN_DEGREES) {
    horizontalIndex = 2;
  } else if (lngDiff > FIVE_MINUTES_IN_DEGREES) {
    horizontalIndex = 1;
  } else {
    horizontalIndex = 0;
  }

  const fiveMinCharacterArray = [
    ['7', '8', '9'],
    ['3', '5', '6'],
    ['1', '2', '3'],
  ];
  return fiveMinCharacterArray[verticalIndex][horizontalIndex];
}

function llToGars(ll: LatLng, precision: GarsPrecision) {
  //TODO Normalize to -180/+180 degrees longitude

  const lngBand = getGarsNumbers(ll.lng);

  const latBand = getGarsLetters(ll.lat);

  if (precision === GarsPrecision.ThirtyMinutes) {
    return lngBand + latBand;
  } else if (precision === GarsPrecision.FifteenMinutes) {
    const quadrant = _getQuadrant(ll);

    return lngBand + latBand + quadrant;
  } else if (precision === GarsPrecision.FiveMinutes) {
    const quadrant = _getQuadrant(ll);
    const keypad = _getKeypad(ll);

    return lngBand + latBand + quadrant + keypad;
  } else {
    console.error('unknown precision detected: ' + precision);
  }
}

function garsToCornerLl(gars: any) {}

function garsToCenterLl(gars: any) {}

/**
 * This function returns the GARS latitude string for a given latitude
 * @param {number} lat - Latitude
 * @returns {string} - GARS Latitude letters
 */
function getGarsLetters(lat: number): string {
  // Algorithm calculates letters above latitude, since 90 is the max latitude,
  // short circuit the return value
  if (lat === 90) {
    return 'QZ';
  } else {
    // Shift from -90/+90 to 0/+180
    const difference: number = lat + 90;
    // Difference in degrees divided by 24 total GARS letters (at 0.5 degrees each)
    const firstChar: string = GarsLetters[Math.floor(difference / 12)];
    // The remainder of the modulus indicates the number of degrees North we must traverse.
    // Dividing by 0.5 degrees indicates the final index in the garsLetters array
    const secondChar: string = GarsLetters[Math.floor((difference % 12) / 0.5)];

    return firstChar + secondChar;
  }
}

/**
 * This function returns the GARS longitude string for a given longitude
 * @param {number} lng - Longitude
 * @returns {string} - A GARS longitude string
 */
function getGarsNumbers(lng: number): string {
  //TODO Normalize to -180/+180 degrees
  if (lng === 180) {
    return '720';
  } else {
    let count: number = 0;

    while (lng >= -180) {
      lng -= 0.5;
      count++;
    }

    let result: string = count.toString();

    while (result.length < 3) {
      result = '0' + result;
    }
    return result;
  }
}

export { llToGars, garsToCenterLl, garsToCornerLl, getGarsLetters, getGarsNumbers };
