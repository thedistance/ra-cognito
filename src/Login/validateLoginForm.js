const validateLoginForm = (values, props) => {
  const errors = {};
  const { translate } = props;
  if (!values.username) errors.username = translate('ra.validation.required');
  if (!values.password) errors.password = translate('ra.validation.required');
  return errors;
};

export default validateLoginForm;
