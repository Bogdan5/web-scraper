const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};
  let dataCopy = {};
  // Convert empty fields to an empty string so we can use validator functions
  dataCopy.name = !isEmpty(data.name) ? data.name : '';
  dataCopy.email = !isEmpty(data.email) ? data.email : '';
  dataCopy.password = !isEmpty(data.password) ? data.password : '';
  dataCopy.password2 = !isEmpty(data.password2) ? data.password2 : '';
  // Name checks
  if (Validator.isEmpty(dataCopy.name)) {
    errors.name = 'Name field is required';
  }
  // Email checks
  if (Validator.isEmpty(dataCopy.email)) {
    errors.email = 'Email field is required';
  } else if (!Validator.isEmail(dataCopy.email)) {
    errors.email = 'Email is invalid';
  }
  // Password checks
  if (Validator.isEmpty(dataCopy.password)) {
    errors.password = 'Password field is required';
  }
  if (Validator.isEmpty(dataCopy.password2)) {
    errors.password2 = 'Confirm password field is required';
  }
  if (!Validator.isLength(dataCopy.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }
  if (!Validator.equals(dataCopy.password, dataCopy.password2)) {
    errors.password2 = 'Passwords must match';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
