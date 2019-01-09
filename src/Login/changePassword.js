import React from 'react';
import PropTypes from 'prop-types';
import { Field, propTypes, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import { translate } from 'ra-core';
import styles from './formStyles';
import mapStateToProps from './isLoading';
import validate from './validateChangePassword';

// see http://redux-form.com/6.4.3/examples/material-ui/
const renderInput = ({
  meta: { touched, error } = {}, // eslint-disable-line react/prop-types
  input: { ...inputProps }, // eslint-disable-line react/prop-types
  ...props
}) => (
  <TextField
    error={Boolean(touched && error)}
    helperText={touched && error}
    {...inputProps}
    {...props}
    fullWidth
  />
);

export const ChangePasswordForm = ({
  classes,
  isLoading,
  handleSubmit,
  translate,
  changePassword,
}) => (
  <form onSubmit={handleSubmit(changePassword)}>
    <div className={classes.form}>
      <p>Please change your password to continue signing in.</p>
      <div className={classes.input}>
        <Field
          id="password"
          name="password"
          component={renderInput}
          label={translate('ra.auth.password')}
          type="password"
          disabled={isLoading}
        />
      </div>
    </div>
    <CardActions>
      <Button
        variant="raised"
        type="submit"
        color="primary"
        disabled={isLoading}
        className={classes.button}
      >
        {isLoading && <CircularProgress size={25} thickness={2} />}
        {'Change Password'}
      </Button>
    </CardActions>
  </form>
);

ChangePasswordForm.propTypes = {
  ...propTypes,
  classes: PropTypes.object,
  redirectTo: PropTypes.string,
};

const enhance = compose(
  withStyles(styles),
  translate,
  connect(mapStateToProps),
  reduxForm({
    form: 'signIn',
    validate,
  })
);

export default enhance(ChangePasswordForm);
