import { fetchMock } from 'jest-fetch-mock';

beforeEach(() => {
    fetchMock.resetMocks();
});

test('hello world!', () => {
    expect(1 + 1).toBe(2);
});