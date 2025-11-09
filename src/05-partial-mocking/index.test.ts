import { mockOne } from './index';
import { mockTwo } from './index';
import { mockThree } from './index';
import { unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  return {
    ...originalModule,
    mockOne: jest.fn(() => console.log('mocked one')),
    mockTwo: jest.fn(() => console.log('mocked two')),
    mockThree: jest.fn(() => console.log('mocked three')),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    mockOne();
    mockTwo();
    mockThree();

    expect(mockOne).toHaveBeenCalled();
    expect(mockTwo).toHaveBeenCalled();
    expect(mockThree).toHaveBeenCalled();

    expect(logSpy).not.toHaveBeenCalledWith('foo');
    expect(logSpy).not.toHaveBeenCalledWith('bar');
    expect(logSpy).not.toHaveBeenCalledWith('baz');

    logSpy.mockRestore();
  });

  test('unmockedFunction should log into console', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    unmockedFunction();
    expect(logSpy).toHaveBeenCalledWith('I am not mocked');
    logSpy.mockRestore();
  });
});
