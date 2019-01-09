import isNewPasswordRequired from './isNewPasswordRequired';

test('should return true when a new password is required', () =>
  expect(
    isNewPasswordRequired({ challengeName: 'NEW_PASSWORD_REQUIRED' })
  ).toEqual(true));

test('should return false given an empty challenge name', () =>
  expect(isNewPasswordRequired({ challengeName: '' })).toEqual(false));

test('should return false given no challenge at all', () =>
  expect(isNewPasswordRequired({})).toEqual(false));
