const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Create Schema
const TeacherSchema  = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
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
  tests: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'test'
  }
})

module.exports = Teacher = mongoose.model('teachers', TeacherSchema)