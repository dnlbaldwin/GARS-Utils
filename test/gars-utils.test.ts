import { GarsPrecision } from '../src/gars-types';
import { llToGars, garsToCenterLl, garsToCornerLl } from '../src/gars-utils';

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

describe('GARS to corner LL', () => {
  it('Convert 30 minute GARS to LL corners', () => {
    const inputs = ['001AA', '001QZ', '720AA', '720QZ'];

    const expectedResults = [
      [
        { lat: -89.5, lng: -180 },
        { lat: -89.5, lng: -179.5 },
        { lat: -90, lng: -179.5 },
        { lat: -90, lng: -180 },
      ],
      [
        { lat: 90, lng: -180 },
        { lat: 90, lng: -179.5 },
        { lat: 89.5, lng: -179.5 },
        { lat: 89.5, lng: -180 },
      ],
      [
        { lat: -89.5, lng: 179.5 },
        { lat: -89.5, lng: 180 },
        { lat: -90, lng: 180 },
        { lat: -90, lng: 179.5 },
      ],
      [
        { lat: 90, lng: 179.5 },
        { lat: 90, lng: 180 },
        { lat: 89.5, lng: 180 },
        { lat: 89.5, lng: 179.5 },
      ],
    ];

    inputs.forEach((el, idx) => {
      expect(garsToCornerLl(el)).toStrictEqual(expectedResults[idx]);
    });
  });

  it('Convert 15 minute GARS to LL corners', () => {
    const inputs = ['002AB1', '002QY2', '719AB3', '719QY4'];

    const expectedResults = [
      [
        { lat: -89, lng: -179.5 },
        { lat: -89, lng: -179.25 },
        { lat: -89.25, lng: -179.25 },
        { lat: -89.25, lng: -179.5 },
      ],
      [
        { lat: 89.5, lng: -179.25 },
        { lat: 89.5, lng: -179 },
        { lat: 89.25, lng: -179 },
        { lat: 89.25, lng: -179.25 },
      ],
      [
        { lat: -89.25, lng: 179 },
        { lat: -89.25, lng: 179.25 },
        { lat: -89.5, lng: 179.25 },
        { lat: -89.5, lng: 179 },
      ],
      [
        { lat: 89.25, lng: 179.25 },
        { lat: 89.25, lng: 179.5 },
        { lat: 89, lng: 179.5 },
        { lat: 89, lng: 179.25 },
      ],
    ];

    inputs.forEach((el, idx) => {
      expect(garsToCornerLl(el)).toStrictEqual(expectedResults[idx]);
    });
  });

  it('Convert 5 minute GARS to LL corners', () => {
    const ONE_TWELFTH_DEGREE = 1 / 12;
    const TWO_TWELFTH_DEGREE = 2 / 12;
    const inputs = ['001AA37', '001AA34', '001AA31', '001AA38', '001AA35', '001AA32', '001AA39', '001AA36', '001AA33'];

    const expectedResults = [
      [
        { lat: -90 + ONE_TWELFTH_DEGREE, lng: -180 },
        { lat: -90 + ONE_TWELFTH_DEGREE, lng: -180 + ONE_TWELFTH_DEGREE },
        { lat: -90, lng: -180 + ONE_TWELFTH_DEGREE },
        { lat: -90, lng: -180 },
      ],
      [
        { lat: -90 + TWO_TWELFTH_DEGREE, lng: -180 },
        { lat: -90 + TWO_TWELFTH_DEGREE, lng: -180 + ONE_TWELFTH_DEGREE },
        { lat: -90 + ONE_TWELFTH_DEGREE, lng: -180 + ONE_TWELFTH_DEGREE },
        { lat: -90 + ONE_TWELFTH_DEGREE, lng: -180 },
      ],
      [
        { lat: -89.75, lng: -180 },
        { lat: -89.75, lng: -180 + ONE_TWELFTH_DEGREE },
        { lat: -90 + TWO_TWELFTH_DEGREE, lng: -180 + ONE_TWELFTH_DEGREE },
        { lat: -90 + TWO_TWELFTH_DEGREE, lng: -180 },
      ],
      [
        { lat: -90 + ONE_TWELFTH_DEGREE, lng: -180 + ONE_TWELFTH_DEGREE },
        { lat: -90 + ONE_TWELFTH_DEGREE, lng: -180 + TWO_TWELFTH_DEGREE },
        { lat: -90, lng: -180 + TWO_TWELFTH_DEGREE },
        { lat: -90, lng: -180 + ONE_TWELFTH_DEGREE },
      ],
      [
        { lat: -90 + TWO_TWELFTH_DEGREE, lng: -180 + ONE_TWELFTH_DEGREE },
        { lat: -90 + TWO_TWELFTH_DEGREE, lng: -180 + TWO_TWELFTH_DEGREE },
        { lat: -90 + ONE_TWELFTH_DEGREE, lng: -180 + TWO_TWELFTH_DEGREE },
        { lat: -90 + ONE_TWELFTH_DEGREE, lng: -180 + ONE_TWELFTH_DEGREE },
      ],
      [
        { lat: -89.75, lng: -180 + ONE_TWELFTH_DEGREE },
        { lat: -89.75, lng: -180 + TWO_TWELFTH_DEGREE },
        { lat: -90 + TWO_TWELFTH_DEGREE, lng: -180 + TWO_TWELFTH_DEGREE },
        { lat: -90 + TWO_TWELFTH_DEGREE, lng: -180 + ONE_TWELFTH_DEGREE },
      ],
      [
        { lat: -90 + ONE_TWELFTH_DEGREE, lng: -180 + TWO_TWELFTH_DEGREE },
        { lat: -90 + ONE_TWELFTH_DEGREE, lng: -179.75 },
        { lat: -90, lng: -179.75 },
        { lat: -90, lng: -180 + TWO_TWELFTH_DEGREE },
      ],
      [
        { lat: -90 + TWO_TWELFTH_DEGREE, lng: -180 + TWO_TWELFTH_DEGREE },
        { lat: -90 + TWO_TWELFTH_DEGREE, lng: -179.75 },
        { lat: -90 + ONE_TWELFTH_DEGREE, lng: -179.75 },
        { lat: -90 + ONE_TWELFTH_DEGREE, lng: -180 + TWO_TWELFTH_DEGREE },
      ],
      [
        { lat: -89.75, lng: -180 + TWO_TWELFTH_DEGREE },
        { lat: -89.75, lng: -179.75 },
        { lat: -90 + TWO_TWELFTH_DEGREE, lng: -179.75 },
        { lat: -90 + TWO_TWELFTH_DEGREE, lng: -180 + TWO_TWELFTH_DEGREE },
      ],
    ];

    inputs.forEach((el, idx) => {
      expect(garsToCornerLl(el)[0].lat).toBeCloseTo(expectedResults[idx][0].lat, 6);
      expect(garsToCornerLl(el)[0].lng).toBeCloseTo(expectedResults[idx][0].lng, 6);

      expect(garsToCornerLl(el)[1].lat).toBeCloseTo(expectedResults[idx][1].lat, 6);
      expect(garsToCornerLl(el)[1].lng).toBeCloseTo(expectedResults[idx][1].lng, 6);

      expect(garsToCornerLl(el)[2].lat).toBeCloseTo(expectedResults[idx][2].lat, 6);
      expect(garsToCornerLl(el)[2].lng).toBeCloseTo(expectedResults[idx][2].lng, 6);

      expect(garsToCornerLl(el)[3].lat).toBeCloseTo(expectedResults[idx][3].lat, 6);
      expect(garsToCornerLl(el)[3].lng).toBeCloseTo(expectedResults[idx][3].lng, 6);
    });
  });
});

describe('GARS to center LL', () => {
  it('Convert 30 minute GARS to LL', () => {
    const input = [
      '001AA',
      '001QZ',
      '720AA',
      '720QZ',
      //
      '002AB',
      '002QY',
      '719AB',
      '719QY',
    ];
    const expectedResults = [
      { lat: -89.75, lng: -179.75 },
      { lat: 89.75, lng: -179.75 },
      { lat: -89.75, lng: 179.75 },
      { lat: 89.75, lng: 179.75 },
      //
      { lat: -89.25, lng: -179.25 },
      { lat: 89.25, lng: -179.25 },
      { lat: -89.25, lng: 179.25 },
      { lat: 89.25, lng: 179.25 },
    ];
    input.forEach((el, idx) => {
      expect(garsToCenterLl(el)).toStrictEqual(expectedResults[idx]);
    });
  });

  it('Convert 15 minute GARS to LL', () => {
    const input = [
      '001AA1',
      '001AA2',
      '001AA3',
      '001AA4',
      //
      '001QZ1',
      '001QZ2',
      '001QZ3',
      '001QZ4',
      //
      '720AA1',
      '720AA2',
      '720AA3',
      '720AA4',
      //
      '720QZ1',
      '720QZ2',
      '720QZ3',
      '720QZ4',
      //
      '002AB1',
      '002QY2',
      '719AB3',
      '719QY4',
    ];
    const expectedResults = [
      { lat: -89.625, lng: -179.875 },
      { lat: -89.625, lng: -179.625 },
      { lat: -89.875, lng: -179.875 },
      { lat: -89.875, lng: -179.625 },
      //
      { lat: 89.875, lng: -179.875 },
      { lat: 89.875, lng: -179.625 },
      { lat: 89.625, lng: -179.875 },
      { lat: 89.625, lng: -179.625 },
      //
      { lat: -89.625, lng: 179.625 },
      { lat: -89.625, lng: 179.875 },
      { lat: -89.875, lng: 179.625 },
      { lat: -89.875, lng: 179.875 },
      //
      { lat: 89.875, lng: 179.625 },
      { lat: 89.875, lng: 179.875 },
      { lat: 89.625, lng: 179.625 },
      { lat: 89.625, lng: 179.875 },
      //
      { lat: -89.125, lng: -179.375 },
      { lat: 89.375, lng: -179.125 },
      { lat: -89.375, lng: 179.125 },
      { lat: 89.125, lng: 179.375 },
    ];

    input.forEach((el, idx) => {
      expect(garsToCenterLl(el)).toStrictEqual(expectedResults[idx]);
    });
  });

  it('Convert 5 minute GARS to LL', () => {
    const ONE_TWENTY_FOURTH_DEGREE = 1 / 24;
    const THREE_TWENTY_FOURTH_DEGREE = 3 / 24;
    const FIVE_TWENTY_FOURTH_DEGREE = 5 / 24;

    const inputs = [
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

    const expectedResults = [
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

    inputs.forEach((el, idx) => {
      expect(garsToCenterLl(el)).toStrictEqual(expectedResults[idx]);
    });
  });
});
