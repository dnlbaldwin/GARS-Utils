/**
 *
 */
enum GarsPrecision {
  ThirtyMinutes,
  FifteenMinutes,
  FiveMinutes,
}

// Alphabet, excluding I and O
const GarsLetters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'J',
  'K',
  'L',
  'M',
  'N',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

interface LatLng {
  lat: number;
  lng: number;
}

export { GarsLetters, GarsPrecision, LatLng };
