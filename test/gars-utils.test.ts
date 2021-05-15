import { GarsLetters, GarsPrecision } from '../src/gars-types';
import { llToGars, garsToCenterLl, garsToCornerLl, getGarsLetters, getGarsNumbers } from '../src/gars-utils';

describe('LL to GARS', () => {
  it('Should return the proper five-minute coordinate', () => {
    const ONE_TWENTY_FOURTH_DEGREE = 1 / 24;
    const THREE_TWENTY_FOURTH_DEGREE = 3 / 24;
    const FIVE_TWENTY_FOURTH_DEGREE = 5 / 24;

    const llInputs = [
      //
      { lat: -90, lng: -180 },
      { lat: 90, lng: -180 },
      { lat: -90, lng: 180 },
      { lat: 90, lng: 180 },
      //
      { lat: -90 + ONE_TWENTY_FOURTH_DEGREE, lng: -180 + ONE_TWENTY_FOURTH_DEGREE },
      { lat: -90 + THREE_TWENTY_FOURTH_DEGREE, lng: -180 + ONE_TWENTY_FOURTH_DEGREE },
      { lat: -90 + FIVE_TWENTY_FOURTH_DEGREE, lng: -180 + ONE_TWENTY_FOURTH_DEGREE },
      { lat: -90 + ONE_TWENTY_FOURTH_DEGREE, lng: -180 + THREE_TWENTY_FOURTH_DEGREE },
      { lat: -90 + THREE_TWENTY_FOURTH_DEGREE, lng: -180 + THREE_TWENTY_FOURTH_DEGREE },
      { lat: -90 + FIVE_TWENTY_FOURTH_DEGREE, lng: -180 + THREE_TWENTY_FOURTH_DEGREE },
      { lat: -90 + ONE_TWENTY_FOURTH_DEGREE, lng: -180 + FIVE_TWENTY_FOURTH_DEGREE },
      { lat: -90 + THREE_TWENTY_FOURTH_DEGREE, lng: -180 + FIVE_TWENTY_FOURTH_DEGREE },
      { lat: -90 + FIVE_TWENTY_FOURTH_DEGREE, lng: -180 + FIVE_TWENTY_FOURTH_DEGREE },
      //
      { lat: 90 - ONE_TWENTY_FOURTH_DEGREE, lng: -180 + ONE_TWENTY_FOURTH_DEGREE },
      { lat: 90 - THREE_TWENTY_FOURTH_DEGREE, lng: -180 + ONE_TWENTY_FOURTH_DEGREE },
      { lat: 90 - FIVE_TWENTY_FOURTH_DEGREE, lng: -180 + ONE_TWENTY_FOURTH_DEGREE },
      { lat: 90 - ONE_TWENTY_FOURTH_DEGREE, lng: -180 + THREE_TWENTY_FOURTH_DEGREE },
      { lat: 90 - THREE_TWENTY_FOURTH_DEGREE, lng: -180 + THREE_TWENTY_FOURTH_DEGREE },
      { lat: 90 - FIVE_TWENTY_FOURTH_DEGREE, lng: -180 + THREE_TWENTY_FOURTH_DEGREE },
      { lat: 90 - ONE_TWENTY_FOURTH_DEGREE, lng: -180 + FIVE_TWENTY_FOURTH_DEGREE },
      { lat: 90 - THREE_TWENTY_FOURTH_DEGREE, lng: -180 + FIVE_TWENTY_FOURTH_DEGREE },
      { lat: 90 - FIVE_TWENTY_FOURTH_DEGREE, lng: -180 + FIVE_TWENTY_FOURTH_DEGREE },
      //
      { lat: -90 + ONE_TWENTY_FOURTH_DEGREE, lng: 180 - ONE_TWENTY_FOURTH_DEGREE },
      { lat: -90 + THREE_TWENTY_FOURTH_DEGREE, lng: 180 - ONE_TWENTY_FOURTH_DEGREE },
      { lat: -90 + FIVE_TWENTY_FOURTH_DEGREE, lng: 180 - ONE_TWENTY_FOURTH_DEGREE },
      { lat: -90 + ONE_TWENTY_FOURTH_DEGREE, lng: 180 - THREE_TWENTY_FOURTH_DEGREE },
      { lat: -90 + THREE_TWENTY_FOURTH_DEGREE, lng: 180 - THREE_TWENTY_FOURTH_DEGREE },
      { lat: -90 + FIVE_TWENTY_FOURTH_DEGREE, lng: 180 - THREE_TWENTY_FOURTH_DEGREE },
      { lat: -90 + ONE_TWENTY_FOURTH_DEGREE, lng: 180 - FIVE_TWENTY_FOURTH_DEGREE },
      { lat: -90 + THREE_TWENTY_FOURTH_DEGREE, lng: 180 - FIVE_TWENTY_FOURTH_DEGREE },
      { lat: -90 + FIVE_TWENTY_FOURTH_DEGREE, lng: 180 - FIVE_TWENTY_FOURTH_DEGREE },
      //
      { lat: 90 - ONE_TWENTY_FOURTH_DEGREE, lng: 180 - ONE_TWENTY_FOURTH_DEGREE },
      { lat: 90 - THREE_TWENTY_FOURTH_DEGREE, lng: 180 - ONE_TWENTY_FOURTH_DEGREE },
      { lat: 90 - FIVE_TWENTY_FOURTH_DEGREE, lng: 180 - ONE_TWENTY_FOURTH_DEGREE },
      { lat: 90 - ONE_TWENTY_FOURTH_DEGREE, lng: 180 - THREE_TWENTY_FOURTH_DEGREE },
      { lat: 90 - THREE_TWENTY_FOURTH_DEGREE, lng: 180 - THREE_TWENTY_FOURTH_DEGREE },
      { lat: 90 - FIVE_TWENTY_FOURTH_DEGREE, lng: 180 - THREE_TWENTY_FOURTH_DEGREE },
      { lat: 90 - ONE_TWENTY_FOURTH_DEGREE, lng: 180 - FIVE_TWENTY_FOURTH_DEGREE },
      { lat: 90 - THREE_TWENTY_FOURTH_DEGREE, lng: 180 - FIVE_TWENTY_FOURTH_DEGREE },
      { lat: 90 - FIVE_TWENTY_FOURTH_DEGREE, lng: 180 - FIVE_TWENTY_FOURTH_DEGREE },
    ];

    const expectedResults = [
      //
      '001AA37',
      '001QZ11',
      '720AA49',
      '720QZ23',
      //
      '001AA37',
      '001AA34',
      '001AA31',
      '001AA38',
      '001AA35',
      '001AA32',
      '001AA39',
      '001AA36',
      '001AA33',
      //
      '001QZ11',
      '001QZ14',
      '001QZ17',
      '001QZ12',
      '001QZ15',
      '001QZ18',
      '001QZ13',
      '001QZ16',
      '001QZ19',
      //
      '720AA49',
      '720AA46',
      '720AA43',
      '720AA48',
      '720AA45',
      '720AA42',
      '720AA47',
      '720AA44',
      '720AA41',
      //
      '720QZ23',
      '720QZ26',
      '720QZ29',
      '720QZ22',
      '720QZ25',
      '720QZ28',
      '720QZ21',
      '720QZ24',
      '720QZ27',
    ];

    llInputs.forEach((el, idx) => {
      expect(llToGars(el, GarsPrecision.FiveMinutes)).toBe(expectedResults[idx]);
    });
  });
  it('Should return the proper fifteen-minute coordinate', () => {
    const llInputs = [
      //
      { lat: -90, lng: -180 },
      { lat: 90, lng: -180 },
      { lat: -90, lng: 180 },
      { lat: 90, lng: 180 },
      //
      { lat: 89.625, lng: 179.625 },
      { lat: 89.875, lng: 179.625 },
      { lat: 89.625, lng: 179.875 },
      { lat: 89.875, lng: 179.875 },
      //
      { lat: -60, lng: -180 },
      { lat: 60, lng: -180 },
      { lat: -60, lng: 180 },
      { lat: 60, lng: 180 },
      //
      { lat: -90, lng: -120 },
      { lat: 90, lng: -120 },
      { lat: -90, lng: 120 },
      { lat: 90, lng: 120 },
    ];

    const expectedResults = [
      //
      '001AA3',
      '001QZ1',
      '720AA4',
      '720QZ2',
      //
      '720QZ3',
      '720QZ1',
      '720QZ4',
      '720QZ2',
      //
      '001CN3',
      '001NN3',
      '720CN4',
      '720NN4',
      //
      '121AA3',
      '121QZ1',
      '601AA3',
      '601QZ1',
    ];

    llInputs.forEach((el, idx) => {
      expect(llToGars(el, GarsPrecision.FifteenMinutes)).toBe(expectedResults[idx]);
    });
  });
  it('Should return the proper thirty-minute coordinate', () => {
    const llInputs = [
      //
      { lat: -90, lng: -180 },
      { lat: 90, lng: -180 },
      { lat: -90, lng: 180 },
      { lat: 90, lng: 180 },
      //
      { lat: -89.5, lng: -180 },
      { lat: 89.5, lng: -180 },
      { lat: -89.5, lng: 180 },
      { lat: 89.5, lng: 180 },
      //
      { lat: -45, lng: -90 },
      { lat: 45, lng: -90 },
      { lat: -45, lng: 90 },
      { lat: 45, lng: 90 },
    ];

    const expectedResults = [
      //
      '001AA',
      '001QZ',
      '720AA',
      '720QZ',
      //
      '001AB',
      '001QZ',
      '720AB',
      '720QZ',
      //
      '181DU',
      '181MG',
      '541DU',
      '541MG',
    ];

    llInputs.forEach((el, idx) => {
      expect(llToGars(el, GarsPrecision.ThirtyMinutes)).toBe(expectedResults[idx]);
    });
  });
});

describe('GARS to centre LL', () => {});

describe('GARS to corner LL', () => {});

describe('Get GARS letters', () => {
  it('Should return the proper letter over the entire range', () => {
    let lat = -90;
    GarsLetters.forEach((firstLetter) => {
      GarsLetters.forEach((secondLetter) => {
        if (lat < 90) {
          expect(getGarsLetters(lat)).toBe(firstLetter + secondLetter);
          lat += 0.5;
        } else if (lat === 90) {
          expect(getGarsLetters(lat)).toBe('QZ');
        }
      });
    });
  });

  it('Should except for out of range values', () => {});
});

describe('Get GARS numbers', () => {
  it('Should return the proper numbers over the entire range', () => {
    let lng = -180;
    let zone = 1;
    while (lng <= 180) {
      if (lng === 180) {
        expect(getGarsNumbers(lng)).toBe('720');
      } else {
        let res = zone.toString();
        while (res.length < 3) {
          res = '0' + res;
        }
        expect(getGarsNumbers(lng)).toBe(res);
      }
      zone += 1;
      lng += 0.5;
    }
  });
  it('Should normalize to -180/+180 degrees', () => {});
});
