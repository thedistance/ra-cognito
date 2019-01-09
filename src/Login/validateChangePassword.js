import * as R from 'ramda';

// passwordSatisfies :: (a -> Boolean) -> Object -> Boolean
const passwordSatisfies = R.flip(R.propSatisfies)('password');

// passwordDoesNotMatch :: RegExp -> Object -> Boolean
const passwordDoesNotMatch = R.compose(
  passwordSatisfies,
  R.complement(R.test)
);

// lengthLessThan :: Number -> String -> Boolean
const lengthLessThan = num =>
  R.compose(
    R.flip(R.lt)(num),
    R.length
  );

// passwordSingleton :: a -> Object
const passwordSingleton = R.objOf('password');

// validate :: ((a -> Boolean), String) -> [(a -> Boolean), (a -> Object)]
const validate = (fn, message) => [fn, () => passwordSingleton(message)];

// validateRegex :: (RegExp, String) -> [(a -> Boolean), (a -> Object)]
const validateRegex = (regex, message) =>
  validate(passwordDoesNotMatch(regex), message);

// validatePassword :: Object -> Object
const validatePassword = R.cond([
  validate(
    passwordSatisfies(lengthLessThan(8)),
    'Password must be at least 8 characters.'
  ),
  validateRegex(/[A-Z]/, 'Password must contain an uppercase character.'),
  validateRegex(/[a-z]/, 'Password must contain an lowercase character.'),
  validateRegex(/\d/, 'Password must contain a number.'),
  validateRegex(/[^\dA-Z]/i, 'Password must contain a special character.'),
  [R.T, R.always({})],
]);

// validateChangePassword :: (Object, Object) -> Object
const validateChangePassword = (values, props) =>
  R.ifElse(R.prop('password'), validatePassword, () =>
    passwordSingleton(props.translate('ra.validation.required'))
  )(values);

export default validateChangePassword;
