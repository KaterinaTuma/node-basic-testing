import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { doStuffByTimeout } from '.';
import { doStuffByInterval } from '.';
import { readFileAsynchronously } from '.';

jest.mock('fs');
jest.mock('fs/promises');
jest.mock('path');

const mockedJoin = join as jest.MockedFunction<typeof join>;
const mockedExistsSync = existsSync as jest.MockedFunction<typeof existsSync>;
const mockedReadFile = readFile as jest.MockedFunction<typeof readFile>;

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 2000);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1999);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 3000);
    expect(callback).not.toHaveBeenCalled();
    jest.runAllTimers();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);
    jest.advanceTimersByTime(999);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(2000);
    expect(callback).toHaveBeenCalledTimes(3);
  });

  test('callback should not be called before interval', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 500);
    jest.advanceTimersByTime(499);
    expect(callback).not.toHaveBeenCalled();
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = 'file.txt';
    mockedJoin.mockReturnValue('/mocked/path/file.txt');
    mockedExistsSync.mockReturnValue(false);
    await readFileAsynchronously(pathToFile);
    expect(join).toHaveBeenCalledWith(expect.any(String), pathToFile);
  });

  test('should return null if file does not exist', async () => {
    mockedExistsSync.mockReturnValue(false);
    const result = await readFileAsynchronously('nonexistent.txt');
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const fakeContent = 'Hello World';
    mockedExistsSync.mockReturnValue(true);
    mockedJoin.mockReturnValue('/mocked/path/file.txt');
    mockedReadFile.mockResolvedValue(Buffer.from(fakeContent));
    const result = await readFileAsynchronously('file.txt');
    expect(result).toBe(fakeContent);
    expect(mockedReadFile).toHaveBeenCalledWith('/mocked/path/file.txt');
  });
});
