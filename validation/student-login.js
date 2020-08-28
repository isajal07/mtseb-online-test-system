const Validator = require('validator')
const isEmpty = require('./is-empty')


module.exports = function validateStudentLoginInput(data) {
  let errors = {};

  data.roll = !isEmpty(data.roll) ? data.roll: ''
  data.classNo = !isEmpty(data.classNo) ? data.classNo: ''
  data.password = !isEmpty(data.password) ? data.password: ''

  if(Validator.isEmpty(data.roll)) {
    errors.password = 'Roll field is required.'
  }
  
  if(Validator.isEmpty(data.classNo)) {
    errors.password = 'Class field is required.'
  }
  
  if(Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required.'
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }
}