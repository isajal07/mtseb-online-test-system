// const mongoose = require('mongoose')
// const Schema = mongoose.Schema

// //Create Schema
// const AnswerSchema  = new Schema({
//   teacher: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref:'teachers'
//   },
//   student: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref:'students'
//   },
//   Test: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref:'test'
//   },
//   questions: [{
//     que:{
//     type:Schema.Types.ObjectId,
//     ref:'questions'
//   },
//   textanswer: {
//     type: String
//   },
//   correctAnswer: {
//     type: String,
//     required: true
//    }
// }],
//   date: {
//     type: Date,
//     default: Date.now
//   }
// })

// module.exports = Answer = mongoose.model('answers', AnswerSchema)