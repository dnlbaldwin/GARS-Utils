import { GarsLetters, GarsPrecision, LatLng } from './gars-types';

const QUARTER_DEGREE = 0.25;

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
    ['4', '5', '6'],
    ['1', '2', '3'],
  ];
  return fiveMinCharacterArray[verticalIndex][horizontalIndex];
}

function llToGars(ll: LatLng, precision: GarsPrecision) {
  //TODO Normalize to -180/+180 degrees longitude

  const lngBand = _getGarsNumbers(ll.lng);

  const latBand = _getGarsLetters(ll.lat);

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

function _validateGars(gars: string) {
  const GARS_REGEX = new RegExp(/^([0-7][0-9]{2})([a-qA-Q][a-zA-Z])?([1-4])?([1-9])?/);

  const descructuredGars = GARS_REGEX.exec(gars);

  if (!descructuredGars) {
    throw new Error('Nothing extracted from GARS regexp! Input: ' + gars);
  }
  const longitudeBand = descructuredGars[1] ? descructuredGars[1] : '';
  const latitudeBand = descructuredGars[2] ? descructuredGars[2] : '';

  if (!longitudeBand || !latitudeBand) {
    throw new Error('No valid GARS lat/lng bands detected! Input:' + gars);
  }
  const quadrant = descructuredGars[3] ? descructuredGars[3] : '';
  const keypad = descructuredGars[4] ? descructuredGars[4] : '';

  return [longitudeBand, latitudeBand, quadrant, keypad];
}

function garsToCornerLl(gars: string) {
  const [longitudeBand, latitudeBand, quadrant, keypad] = _validateGars(gars);

  const centerLl = garsToCenterLl(longitudeBand + latitudeBand + quadrant + keypad);
  let halfCellSizeDegrees;
  if (quadrant && keypad) {
    halfCellSizeDegrees = 2.5 / 60;
  } else if (quadrant && !keypad) {
    halfCellSizeDegrees = 7.5 / 60;
  } else {
    halfCellSizeDegrees = 15 / 60;
  }
  return [
    { lat: centerLl.lat + halfCellSizeDegrees, lng: centerLl.lng - halfCellSizeDegrees },
    { lat: centerLl.lat + halfCellSizeDegrees, lng: centerLl.lng + halfCellSizeDegrees },
    { lat: centerLl.lat - halfCellSizeDegrees, lng: centerLl.lng + halfCellSizeDegrees },
    { lat: centerLl.lat - halfCellSizeDegrees, lng: centerLl.lng - halfCellSizeDegrees },
  ];
}

function garsToCenterLl(gars: string) {
  const [longitudeBand, latitudeBand, quadrant, keypad] = _validateGars(gars);

  // The base value for a 30 minute cell
  let result = { lat: getBaseLatitudeFromGars(latitudeBand), lng: getBaseLongitudeFromGars(longitudeBand) };

  if (quadrant) {
    if (quadrant === '1') {
      result.lat += 0.125;
      result.lng -= 0.125;
    } else if (quadrant === '2') {
      result.lat += 0.125;
      result.lng += 0.125;
    } else if (quadrant === '3') {
      result.lat -= 0.125;
      result.lng -= 0.125;
    } else {
      result.lat -= 0.125;
      result.lng += 0.125;
    }

    if (keypad) {
      const ONE_TWELFTH_DEGREE = 1 / 12;
      if (keypad === '1') {
        result.lat += ONE_TWELFTH_DEGREE;
        result.lng -= ONE_TWELFTH_DEGREE;
      } else if (keypad === '2') {
        result.lat += ONE_TWELFTH_DEGREE;
      } else if (keypad === '3') {
        result.lat += ONE_TWELFTH_DEGREE;
        result.lng += ONE_TWELFTH_DEGREE;
      } else if (keypad === '4') {
        result.lng -= ONE_TWELFTH_DEGREE;
      } else if (keypad === '5') {
        // no-op - already on target
      } else if (keypad === '6') {
        result.lng += ONE_TWELFTH_DEGREE;
      } else if (keypad === '7') {
        result.lat -= ONE_TWELFTH_DEGREE;
        result.lng -= ONE_TWELFTH_DEGREE;
      } else if (keypad === '8') {
        result.lat -= ONE_TWELFTH_DEGREE;
      } else {
        result.lat -= ONE_TWELFTH_DEGREE;
        result.lng += ONE_TWELFTH_DEGREE;
      }
    }
  }
  return result;
}

/**
 * This function returns the GARS latitude string for a given latitude
 * @param {number} lat - Latitude
 * @returns {string} - GARS Latitude letters
 */
function _getGarsLetters(lat: number): string {
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
function _getGarsNumbers(lng: number): string {
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

function getBaseLatitudeFromGars(garsLetters: string): number {
  if (garsLetters.length > 2 || garsLetters.length < 2) {
    throw new RangeError('GARS Latitude indicator strings must be two characters!');
  }

  const charArray = Array.from(garsLetters);

  const indexOfFirstChar = GarsLetters.indexOf(charArray[0]);
  const indexOfSecondChar = GarsLetters.indexOf(charArray[1]);

  if (indexOfFirstChar > GarsLetters.indexOf('Q')) {
    throw new RangeError('Invalid GARS value detected.  Max value is QZ, got: ' + garsLetters);
  }

  const DEGREES_PER_LETTER = 0.5;

  return -90 + DEGREES_PER_LETTER * (indexOfFirstChar * GarsLetters.length + indexOfSecondChar) + QUARTER_DEGREE;
}

function getBaseLongitudeFromGars(garsNumbers: string): number {
  if (garsNumbers.length > 3 || garsNumbers.length < 3) {
    throw new RangeError('GARS Longitude indicator strings must be three characters');
  }

  const result = -180 + parseInt(garsNumbers) / 2 - 0.5;

  if (result < -180 || result >= 180) {
    throw new RangeError('Invalid GARS value received: ' + garsNumbers);
  } else {
    return result + QUARTER_DEGREE;
  }
}

export { llToGars, garsToCenterLl, garsToCornerLl };
