import {
  llToGars,
  garsLetters,
  garsToCenterLl,
  garsToCornerLl,
  getGarsLetters,
  getGarsNumbers,
} from '../src/gars-utils';

describe('LL to GARS', () => {});

describe('GARS to centre LL', () => {});

describe('GARS to corner LL', () => {});

describe('Get GARS letters', () => {
  it('Should return the proper letter over the entire range', () => {
    let lat = -90;
    garsLetters.forEach((firstLetter) => {
      garsLetters.forEach((secondLetter) => {
        expect(getGarsLetters(lat)).toBe(firstLetter + secondLetter);
        lat += 0.5;
      });
    });
  });

  it('Should except for out of range values', () => {});
});

describe('Get GARS numbers', () => {
  it('Should return the proper numbers over the entire range', () => {
    let lng = -180;
    let zone = 1;
    while (lng < 180) {
      let res = zone.toString();
      while (res.length < 3) {
        res = '0' + res;
      }
      expect(getGarsNumbers(lng)).toBe(res);
      zone += 1;
      lng += 0.5;
    }
  });
  it('Should normalize to -180/+180 degrees', () => {});
});
