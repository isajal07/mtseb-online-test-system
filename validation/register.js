const Validator = require('validator')
const isEmpty = require('./is-empty')


module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name: ''
  data.username = !isEmpty(data.username) ? data.username: ''
  data.password = !isEmpty(data.password) ? data.password: ''
  data.password2 = !isEmpty(data.password2) ? data.password2: ''


  if(!Validator.isLength(data.name, { min: 2, max: 30})) {
    errors.name = 'Name must be between 2 and 30 characters';
  }
  if(!Validator.isAlpha(data.name)) {
    errors.name = 'Only alpabets are allowed for name.';
  }
  if(!Validator.isAlphanumeric(data.username)) {
    errors.username = 'Only alpabets or numbers are allowed for username.';
  }

  if(Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required.'
  }

  if(Validator.isEmpty(data.username)) {
    errors.username = 'Username field is required.'
  }

  if(Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required.'
  }

  if(Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm password field is required.'
  }

  if(!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}