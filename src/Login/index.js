import * as R from 'ramda';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import defaultTheme from 'ra-ui-materialui/lib/defaultTheme';
import Notification from 'ra-ui-materialui/lib/layout/Notification';
import { userLogin } from 'ra-core';

import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import LockIcon from '@material-ui/icons/Lock';

import { changePassword, login } from '../AuthProvider';

import ChangePasswordForm from './changePassword';
import DefaultLoginForm from './loginForm';
import isNewPasswordRequired from './isNewPasswordRequired';
import pageStyles from './pageStyles';
import sanitizeRestProps from './sanitizeRestProps';

export class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      cognitoUser: null,
      step: 'login',
    };

    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleChangePassword(auth, dispatch) {
    return changePassword(
      R.compose(
        R.merge(auth),
        R.pick(['cognitoUser'])
      )(this.state)
    ).then(result => dispatch(userLogin(result)));
  }

  handleLogin(auth, dispatch) {
    return login(auth)
      .then(cognitoUser => {
        if (isNewPasswordRequired(cognitoUser)) {
          this.setState({
            cognitoUser,
            step: 'change_password',
          });
        } else {
          dispatch(userLogin(cognitoUser));
        }
      })
      .catch(error => dispatch(userLogin({ error })));
  }

  render() {
    const { classes, className, ...rest } = this.props;
    const { step } = this.state;
    return (
      <div
        className={classnames(classes.main, className)}
        {...sanitizeRestProps(rest)}
      >
        <Card className={classes.card}>
          <div className={classes.avatar}>
            <Avatar className={classes.icon}>
              <LockIcon />
            </Avatar>
          </div>
          {step === 'login' ? (
            <DefaultLoginForm login={this.handleLogin} />
          ) : step === 'change_password' ? (
            <ChangePasswordForm changePassword={this.handleChangePassword} />
          ) : null}
        </Card>
        <Notification />
      </div>
    );
  }
}

Login.propTypes = {
  className: PropTypes.string,
  authProvider: PropTypes.func,
  classes: PropTypes.object,
  input: PropTypes.object,
  meta: PropTypes.object,
  previousRoute: PropTypes.string,
  loginForm: PropTypes.element,
};

Login.defaultProps = {
  theme: defaultTheme,
};

export default withStyles(pageStyles)(Login);
