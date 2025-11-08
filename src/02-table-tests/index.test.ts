import { simpleCalculator } from './index';
import { Action } from './index';

const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 2, b: 2, action: Action.Add, expected: 4 },
    { a: 3, b: 2, action: Action.Add, expected: 5 },
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 3, b: 2, action: Action.Subtract, expected: 1 },
    { a: 3, b: 2, action: Action.Multiply, expected: 6 },
    { a: 6, b: 2, action: Action.Divide, expected: 3 },
    { a: 6, b: 2, action: Action.Exponentiate, expected: 36 },
    { a: 1, b: 2, action: '$', expected: null },
    { a: true, b: 2, action: '+', expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should return $expected for $action with a=$a and b=$b',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    }
  );
});
