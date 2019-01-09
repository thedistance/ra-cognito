/* eslint-disable prefer-promise-reject-errors */

import * as R from 'ramda';
import { Auth } from 'aws-amplify';
import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_CHECK,
  AUTH_ERROR,
  AUTH_GET_PERMISSIONS,
} from 'react-admin';
import { CognitoUser } from 'amazon-cognito-identity-js';

// applyBinaryFn = (* -> a) -> [*] -> a
export const applyBinaryFn = f => R.apply(R.binary(f));

// getError :: Object -> a
export const getError = R.prop('error');

// completeNewPassword :: String -> String -> Object
export const completeNewPassword = applyBinaryFn(
  Auth.completeNewPassword.bind(Auth)
);

// signIn :: String -> String -> Object
export const signIn = applyBinaryFn(Auth.signIn.bind(Auth));

// login :: Object -> Object
export const login = params => {
  if (params instanceof CognitoUser) {
    return params;
  }
  const error = getError(params);
  if (error) {
    return Promise.reject(error);
  }
  return R.compose(
    signIn,
    R.props(['username', 'password'])
  )(params);
};

export const logout = () => Auth.signOut({ global: true });

// changePassword :: Object -> Object
export const changePassword = params =>
  R.compose(
    completeNewPassword,
    R.props(['cognitoUser', 'password'])
  )(params);

export const currentSession = () =>
  Auth.currentSession().then(session => {
    if (!session) {
      return Promise.reject('You need to sign in to access that page.');
    }
    return session;
  });

const AuthProvider = (type, params) => {
  if (type === AUTH_LOGIN) {
    return login(params);
  }
  if (type === AUTH_LOGOUT) {
    return logout(params);
  }
  if (type === AUTH_CHECK) {
    return currentSession();
  }
  if (type === AUTH_ERROR) {
    return Promise.resolve(); // 4xx errors should not log the user out.
  }
  if (type === AUTH_GET_PERMISSIONS) {
    return Promise.resolve({}); // Unimplemented (global permissions)
  }
  return Promise.reject(`Unsupported authentication method ${type}.`);
};

export default AuthProvider;
