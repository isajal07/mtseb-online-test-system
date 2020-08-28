const Validator = require('validator')
const isEmpty = require('./is-empty')


module.exports = function validateStudentRegisterInput(data) {
  let errors = {};

  
  data.name = !isEmpty(data.name) ? data.name: ''
  data.roll = !isEmpty(data.roll) ? data.roll: ''
  data.classNo = !isEmpty(data.classNo) ? data.classNo: ''
  data.password = !isEmpty(data.password) ? data.password: ''
  data.password2 = !isEmpty(data.password2) ? data.password2: ''


  if(!Validator.isLength(data.name, { min: 2, max: 30})) {
    errors.name = 'Name must be between 2 and 30 characters';
  }

  if(Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required.'
  }

  if(Validator.isEmpty(data.roll)) {
    errors.roll = 'Roll field is required.'
  }
  if(Validator.isEmpty(data.classNo)) {
    errors.classNo = 'Class field is required.'
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