import validate from './validateChangePassword';

const translate = () => 'Required';

test('should validate that the password exists', () =>
  expect(validate({}, { translate })).toMatchSnapshot());

test('should validate that the password has a minimum length', () =>
  expect(validate({ password: '123' }, { translate })).toMatchSnapshot());

test('should validate that the password has uppercase characters', () =>
  expect(validate({ password: 'abcabcabc' }, { translate })).toMatchSnapshot());

test('should validate that the password has lowercase characters', () =>
  expect(validate({ password: 'ABCABCABC' }, { translate })).toMatchSnapshot());

test('should validate that the password has a number', () =>
  expect(validate({ password: 'abcABCabc' }, { translate })).toMatchSnapshot());

test('should validate that the password has a special character', () =>
  expect(validate({ password: 'abcABC123' }, { translate })).toMatchSnapshot());

test('should have no error messages if the password is valid', () =>
  expect(validate({ password: 'abc|ABC12' }, { translate })).toEqual({}));
