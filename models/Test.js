const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Create Schema
const TestSchema  = new Schema({
  teacher:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'teachers'
  },
  subject:{
    type:String,
    required:true
  },
  classNo:{
    type:Number,
    required:true
  },
  questions:[{
    teacher:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'teachers'
    },
    question: {
      type: String,
      required: true
    },
    options:{
      type:[String],
    },
    text: {
      type: String
    },
    correctAnswer: {
      type:Number ,
      required: true
    },
    desc:{
      type: String,
      required: true
    }
  }],
  answers:[{
    student:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'students'
  },
    name: {
      type:String,
      required: true
  },
    classNo:{
      type:String,
      required: true
    },
    roll:{
      type:String,
      required: true
    },
    score: {
      type: String
  },
  total: {
    type: String
  } 
  }],
  starttest:{
    type: String,
    default: false
  },
  date:{
    type:Date,
    default: Date.now
  }
})



module.exports = Test = mongoose.model('test', TestSchema)