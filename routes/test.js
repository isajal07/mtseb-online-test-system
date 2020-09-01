const express = require('express')
const router = express.Router()
const passport =require('passport')

//Post model
// const Question = require('../models/Question')
const Test = require('../models/Test')
const Starttest = require('../models/Starttest')
//Profile model
const Teacher = require('../models/Teacher')
const Student = require('../models/Student')
const { restart } = require('nodemon')
const authorize = require('../_helpers/authorize')


//@route POST api/test
//@desc Create a test
//@access Private
router.post('/', authorize('teacher'), async (req,res) => {
  const testFields = {}
  testFields.teacher = req.user.id
  testFields.subject = req.body.subject
  testFields.classNo = req.body.classNo

try {
  let test = await Test.findOne({teacher: req.user.id})

  if(test) {
    //Update
    test = await Test.findOneAndUpdate(
      { teacher: req.user.id}, 
      {$set: testFields},
      {new: true}
    )
      return res.json(test)
  }

  test = new Test(testFields)
  await test.save()
  res.json(test)
} catch(err) {
  console.error(err.message)
  res.status(500).send('Server Error')
}

})

 //@route DELETE api/test/:id
//@desc Delete Test
//@access Private
router.delete('/:id',  authorize('teacher'), async (req,res) => {

  try {
    const test = await Test.findById(req.params.id)
    
    if(!test){
      return res.status(404).json({msg:'Test not found.'})
    }
    //Check user
    if(test.teacher === req.user.id) {
      return res.status(401).json({msg: 'User not authorized.'})
    }

    await test.remove()
    res.json({msg:'Test deleted.'})

  } catch(err) {
    console.log(err.message)
    if(err.kind === 'ObjectId'){
      return res.status(404).json({msg:'Test not found.'})
    }
    res.status(500).send('Server error')
  }
  
})   

//@route POST api/questions
//@desc Create and update questions
//@access Private
router.post('/questions',  authorize('teacher'), async (req,res) => {
  
    correctAns = req.body.correctAnswer
      const newQuestion = {
        question: req.body.question,
        options: req.body.options,
        correctAnswer: correctAns,
         desc: req.body.desc,
         image: req.body.img
      }

      try {
        const test = await Test.findOne({teacher: req.user.id})
        test.questions.push(newQuestion)

        await test.save()
        res.json(test)
      } catch(err) {
        console.log(err.message)
        res.status(500).send('Server error')
      }
      
    })

 //@route DELETE api/test/question/:id
//@desc Delete single question
//@access Private
router.delete('/:tid/:qid',  authorize('teacher'), async (req,res) => {

  try {
    const test = await Test.findById(req.params.tid)
    //Pull out question
    const question = test.questions.find(
      test => test.id === req.params.qid 
    ) 
    console.log(question.id)
    
      //Make sure question exists
      if(!question) {
        return res.status(404).json({msg:'Question does not exist'})
      }

      //Check user
      if(test.teacher === req.user.id) {
        return res.status(401).json({msg: 'User not authorized.'})
      }

      //Get remove index
      const removeIndex = test.questions
        .map(question => question.id)
        .indexOf(question.id)

        test.questions.splice(removeIndex,1)

        await test.save()
        res.json(test)

  } catch(err) {
    console.log(err.message)
    res.status(500).send('Server error')
  }
  
})  


    //@route GET api/test/all
//@desc Get all test
//@access Private
router.get('/all',authorize(), async(req, res) => {
  try{
    const test = await Test.find({})
      .populate('teacher',['name'])
    if(!test) return res.status(400).json({ msg: 'No tests!'})
    
    res.json(test)
  } catch(err) {
    console.error(err.message)
    if(err.kind == 'ObjectId') {
      return res.status(400).json({msg: 'No tests!'})

    }
    res.status(500).send('Server Error!')
  }
  
})

//@route GET api/test/:class
//@desc Get test
//@access Private
router.get('/:classNo',authorize(), async(req, res) => {
  try{
    const test = await Test.findOne({classNo: req.params.classNo})
      // .populate('teacher','class','subject','questions',['question', 'options'])
      .populate('teacher',['name','id'])
    if(!test) return res.status(400).json({ msg: 'No tests!'})
    

    const studentView = [{
      id:test.id,
      starttest: test.starttest,
      subject: test.subject,
      classNo: test.classNo,
      teacher: test.teacher.name,
      teacherid:test.teacher.id,
      date: test.teacher.date,
      questions: test.questions,
      img:test.image,
      correctAnswer: test.questions.map(a => a.correctAnswer),
      answers:test.answers
      //   questions: { question: test.questions.map(a=>a.question),
      //                 options: test.questions.map(a=>a.options)}
    }]
    
    const testGiven = test.answers.map(a=>a.name).includes(req.user.name)

    if(testGiven) {
      res.status(400).json({msg: 'You have already given this test!'})
    }
    else{ 
      res.json(studentView)}
  } 
  catch(err) {
    console.error(err.message)
    if(err.kind == 'ObjectId') {
      return res.status(400).json({msg: 'No tests!'})

    }
    res.status(500).send('Server Error!')
  }
  
})
//@route GET api/test/t/:tid
//@desc Get test by creator's id 
//@access Private
router.get('/t/:tid',authorize(), async(req, res) => {
  try{
    const test = await Test.findOne({teacher:req.params.tid})
    .populate('teacher',['name','id'])
      // .populate('teacher','class','subject','questions',['question', 'options'])
    if(!test) return res.status(400).json({ msg: 'No tests!'})
    
    const studentView = [{
      id:test.id,
      starttest: test.starttest,
      subject: test.subject,
      classNo: test.classNo,
      teacher: test.teacher.name,
      teacherid:test.teacher.id,
      date: test.teacher.date,
      questions: test.questions,
      img:test.image,
      answers:test.answers
    //   questions: { question: test.questions.map(a=>a.question),
    //                 options: test.questions.map(a=>a.options)}
    }]
    res.json(studentView)
  } catch(err) {
    console.error(err.message)
    if(err.kind == 'ObjectId') {
      return res.status(400).json({msg: 'No tests!'})

    }
    res.status(500).send('Server Error!!!')
  }
  
})

//@route POST api/test/:tid/:qid
//@desc Post the answer of the test
//@access Private
router.post('/answer/:tid',  authorize(), async (req,res) => {

  try {
    const student = await Student.findById(req.user.id)
    const test = await Test.findById(req.params.tid)

    console.log(student.name)
    
    const newScore = {
      student:req.user.id,
      name:student.name,
      classNo:student.classNo,
      roll:student.roll,
      score:req.body.score,
      total:req.body.total
    }
    
    console.log(!test.answers.some(a=>a.name === student.name))
   
    if(test.answers.some(a=>a.name === student.name)){
     return res.status(500).json('Duplicate value')
    }
  
    test.answers.push(newScore)
  
    await test.save()
    
    res.json(res.status(200).json('Test submitted!'))
  } catch(err) {
    console.log(err.message)
    res.status(500).send('Server error')
  }
  
})

//@route PUT api/test/starttest/:class
//@desc Push to enable/disable the start the test.
//@access Private
router.put('/starttest/:classNo',authorize(), async(req, res) => {
  try{
    const test = await Test.findOne({classNo: req.params.classNo})


    
      const newTest = await Test.findOneAndUpdate({classNo: req.params.classNo},{$set:{starttest:!test.starttest}})
    
   
    

    res.json("Change successful.")
  
  } catch(err) {
    console.error(err.message)
    if(err.kind == 'ObjectId') {
      return res.status(400).json({msg: 'No tests!'})

    }
    res.status(500).send('Server Error!')
  }
  
})


module.exports = router