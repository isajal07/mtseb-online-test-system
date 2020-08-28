const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Create Schema
const StudentSchema  = new Schema({
  name: {
    type: String,
    required: true
  },
  classNo: {
    type: String,
    required: true
  },
  roll: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role:{
    type:String,
    required: true
  },
  isOnline: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Student = mongoose.model('students', StudentSchema)