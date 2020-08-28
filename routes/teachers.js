const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { secret } = require('../config.json');

const authorize = require('../_helpers/authorize')

//Load input validation
const validateRegisterInput = require('../validation/register')
const validateLoginInput = require('../validation/login')

//Load Teacher Model
const Teacher = require('../models/Teacher')





//@route POST api/teachers/register/:teacher
//@desc Register teacher
//@access Public
router.post('/register/:role',(req,res) => {
  const {errors, isValid } = validateRegisterInput(req.body)

  //Check validation
  if(!isValid) {
    return res.status(400).json(errors)
  }
  Teacher.findOne({username: req.body.username})
    .then(teacher => {
      if(teacher) {
        errors.username = 'Username already exists'
        return res.status(400).json(errors)
      } else {
        const newTeacher = new Teacher({
          name:req.body.name,
          username:req.body.username,
          role:req.params.role, //role is declared from the param of the url.(if its teacher or student)
          password: req.body.password,

        })

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newTeacher.password, salt, (err, hash) =>{
            if(err) {
              throw err
            }
            
            newTeacher.password = hash;
            newTeacher.save()
              .then(user => res.json(user))
              .catch(err => res.json(err))
          } )
        })

      }
    }
    )    .catch(err=>res.json('Server Error!'))

})

//@route POST api/teachers/login
//@desc Login teacher
//@access Public
router.post('/login', (req,res) => {
  const { errors, isValid } = validateLoginInput(req.body)

  //Check validation
  if(!isValid) {
   return res.status(400).json(errors)
 }

  const {username, password } = req.body;
 
  //Find user by email
  Teacher.findOne({username})
    .then(user => {
      //Check for user
      if(!user) {
        errors.username = 'User not found'
        return res.status(404).json(errors)
      }
      //Check password
      bcrypt.compare(password, user.password)
      .then(isMatch => {
        if(isMatch) {
          //User match
          const payload = { id: user.id, name: user.name, role: user.role } //Create JWT Payload
          //Sign Token
          jwt.sign(
            payload,
            secret,
            {expiresIn: 3600},
            (err, token) => {
              res.json({
                success: true,
                id:user.id,
                name:user.name,
                role:user.role,
                token: 'Bearer ' + token
              })
          })
        } else {
          errors.password = 'Password incorrect.'
          return res.status(400).json(errors)
        }
      })
    })    .catch(err=>res.json('Server Error!'))

})

//@route  GET api/teachers/current
//@desc   Return current user(teacher/student)
//@access Private
router.get('/current',authorize(), (req, res) => {
 try{ res.json(req.user)
 }catch(err) {
   res.status(500).send('Server Error!')
 }
})

//@route GET api/teachers/all
//@desc Display all the teacher
//@access Private
router.get('/all',authorize('teacher'),async (req,res) => {
  try{
    const teachers = await Teacher.find()
    .populate('test')
    res.json(teachers)
    console.log('from teachersss',teachers.map(a=>a.test))
  } catch(err) {
    console.log(err.message)
    res.status(500).send('Server Error!')
  }

})




module.exports = router;