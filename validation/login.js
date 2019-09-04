const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};
  let dataCopy = {};

  // Convert empty fields to an empty string so we can use validator functions
  dataCopy.email = !isEmpty(data.email) ? data.email : '';
  dataCopy.password = !isEmpty(data.password) ? data.password : '';
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
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
