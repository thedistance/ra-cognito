import { propEq } from 'ramda';

// isNewPasswordRequired :: Object -> Boolean
const isNewPasswordRequired = propEq('challengeName', 'NEW_PASSWORD_REQUIRED');

export default isNewPasswordRequired;
