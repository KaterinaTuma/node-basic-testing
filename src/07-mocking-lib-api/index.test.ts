import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => {
  const original = jest.requireActual('lodash');
  return {
    ...original,
    throttle: jest.fn((fn) => fn),
  };
});

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const mockedAxiosCreate = jest.spyOn(axios, 'create');
    const mockGet = jest.fn().mockResolvedValue({ data: { foo: 'bar' } });
    mockedAxiosCreate.mockReturnValue({ get: mockGet } as any);
    await throttledGetDataFromApi('/posts');
    expect(mockedAxiosCreate).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockedAxiosCreate = jest.spyOn(axios, 'create');
    const mockGet = jest.fn().mockResolvedValue({ data: { id: 1 } });
    mockedAxiosCreate.mockReturnValue({ get: mockGet } as any);
    const relativePath = '/todos/1';
    await throttledGetDataFromApi(relativePath);
    expect(mockGet).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const mockedAxiosCreate = jest.spyOn(axios, 'create');
    const fakeData = { id: 42, title: 'Test' };
    const mockGet = jest.fn().mockResolvedValue({ data: fakeData });
    mockedAxiosCreate.mockReturnValue({ get: mockGet } as any);
    const result = await throttledGetDataFromApi('/todos/42');
    expect(result).toEqual(fakeData);
  });
});
