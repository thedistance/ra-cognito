import validate from './validateLoginForm';

const translate = () => 'Required';

test('should ensure that username is required', () =>
  expect(validate({ password: '1' }, { translate })).toEqual({
    username: 'Required',
  }));

test('should ensure that password is required', () =>
  expect(validate({ username: '1' }, { translate })).toEqual({
    password: 'Required',
  }));

test('should have no error messages if both are provided', () =>
  expect(validate({ username: '1', password: '1' }, { translate })).toEqual(
    {}
  ));
