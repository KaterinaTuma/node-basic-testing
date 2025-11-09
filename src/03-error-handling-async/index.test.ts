import { throwError } from './index';
import { throwCustomError } from './index';
import { resolveValue } from './index';
import { MyAwesomeError } from './index';
import { rejectCustomError } from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const value = 42;
    await expect(resolveValue(value)).resolves.toBe(value);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const message = 'My super message';
    expect(() => throwError(message)).toThrow(message);
  });

  test('should throw error with default message if message is not provided', () => {
    const defaultMessage = 'Oops!';
    expect(() => throwError()).toThrow(defaultMessage);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    const customMessage = 'This is my awesome custom error!';
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
    expect(() => throwCustomError()).toThrow(customMessage);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    const customMessage = 'This is my awesome custom error!';
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
    await expect(rejectCustomError()).rejects.toThrow(customMessage);
  });
});
