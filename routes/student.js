const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const key = require('../config/key')
const passport = require('passport')
const authorize = require('../_helpers/authorize')
const { secret } = require('../config.json');


//Load input validation
const validateStudentRegisterInput = require('../validation/student-register')
const validateStudentLoginInput = require('../validation/student-login')

//Load Teacher Model
const Student = require('../models/Student')

//@route POST api/student/register/:student
//@desc Register student
//@access Public
router.post('/register/:role',(req,res) => {
  const {errors, isValid } = validateStudentRegisterInput(req.body)

  //Check validation
  if(!isValid) {
    return res.status(400).json(errors)
  }

  Student.findOne({classNo: req.body.classNo, roll: req.body.roll})
    .then(student => {
      if(student) {
        return res.status(400).json({student:'Student already exists!'})
      } else {
        const newStudent = new Student({
          name:req.body.name,
          classNo:req.body.classNo,
          roll:req.body.roll,
          role:req.params.role,
          password: req.body.password
        })

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newStudent.password, salt, (err, hash) =>{
            if(err) {
              throw err
            }
            
            newStudent.password = hash;
            newStudent.save()
              .then(user => res.json(user))
              .catch(err => console.log(err))
          } )
        })

      }
    }
    )
    .catch(err=>res.json('Server Error!'))
})

//@route POST api/student/login
//@desc Login student
//@access Public
router.post('/login', async (req,res) => {
  const { errors, isValid } = validateStudentLoginInput(req.body)

  //Check validation
  if(!isValid) {
   return res.status(400).json(errors)
 }

  // const classss = req.body.class;
  // const roll = req.body.roll;
  const password = req.body.password;
  //Find user by email
  Student.findOne({classNo: req.body.classNo, roll: req.body.roll})
    .then(user => {
      //Check for user
      if(!user) {
        return res.status(404).json({errors:'User not found'})
      }
      //Check password
      bcrypt.compare(password, user.password)
      .then(async isMatch => {
        if(isMatch) {
          //User match
          const payload = { id: user.id, name: user.name, role: user.role } //Create JWT Payload
          //Sign Token
          jwt.sign(
            payload,
            secret,
            {expiresIn: 86400},
            (err, token) => {
              res.json({
                success: true,
                id:user.id,
                name: user.name,
                classNo: user.classNo,
                roll:user.roll, 
                role: user.role,
                isOnline:user.isOnline,
                token: 'Bearer ' + token
              })
          })
        

        } else {
          errors.password = 'Password incorrect.'
          return res.status(400).json(errors)
        }
      })
    })    
    .catch(err=>res.json('Server Error!'))

})

//@route GET api/students/all
//@desc Display all the student
//@access Private
router.get('/all',authorize('teacher'),async (req,res,next) => {
  try{
    
    const students = await Student.find()
    res.json(students)
    // console.log(students.map(a=>a.name))
  } catch(err) {
    console.log(err.message)
    res.status(500).send('Server Error!')
  }
})
//@route PUT api/students
//@desc Change the online status.
//@access Private
router.put('/:onlinecheck',authorize(), async(req, res) => {
  try{
     await Student.findByIdAndUpdate({_id:req.user.id},{$set:{isOnline:req.params.onlinecheck}})
          res.json("You online status changed!")
  } catch(err) {
    console.error(err.message)
    if(err.kind == 'ObjectId') {
      return res.status(400).json({msg: 'No tests!'})
    }
    res.status(500).send('Server Error!')
  
  }
})

module.exports = router;