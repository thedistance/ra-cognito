import isLoading from './isLoading';

test('should return true when loading', () =>
  expect(isLoading({ admin: { loading: 50 } })).toEqual({ isLoading: true }));

test('should return false when not loading', () =>
  expect(isLoading({ admin: { loading: 0 } })).toEqual({ isLoading: false }));
