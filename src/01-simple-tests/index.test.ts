import { simpleCalculator } from './index';
import { Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const rawInput = {
      a: 1,
      b: 2,
      action: Action.Add,
    };
    const sum = simpleCalculator(rawInput);
    const expectedSum = 3;
    expect(sum).toBe(expectedSum);
  });

  test('should subtract two numbers', () => {
    const rawInput = {
      a: 3,
      b: 2,
      action: Action.Subtract,
    };
    const diff = simpleCalculator(rawInput);
    const expectedDiff = 1;
    expect(diff).toBe(expectedDiff);
  });

  test('should multiply two numbers', () => {
    const rawInput = {
      a: 3,
      b: 2,
      action: Action.Multiply,
    };
    const product = simpleCalculator(rawInput);
    const expectedProduct = 6;
    expect(product).toBe(expectedProduct);
  });

  test('should divide two numbers', () => {
    const rawInput = {
      a: 6,
      b: 2,
      action: Action.Divide,
    };
    const division = simpleCalculator(rawInput);
    const expectedDivision = 3;
    expect(division).toBe(expectedDivision);
  });

  test('should exponentiate two numbers', () => {
    const rawInput = {
      a: 6,
      b: 2,
      action: Action.Exponentiate,
    };
    const exp = simpleCalculator(rawInput);
    const expectedExp = 36;
    expect(exp).toBe(expectedExp);
  });

  test('should return null for invalid action', () => {
    const rawInput = {
      a: 1,
      b: 2,
      action: '$',
    };
    const res = simpleCalculator(rawInput);
    const expectedRes = null;
    expect(res).toBe(expectedRes);
  });

  test('should return null for invalid arguments', () => {
    const rawInput = {
      a: true,
      b: 2,
      action: '+',
    };
    const res = simpleCalculator(rawInput);
    const expectedRes = null;
    expect(res).toBe(expectedRes);
  });
});
