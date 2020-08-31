const express = require('express')
const router = express.Router()
const pdf = require('html-pdf')
const studentcard =require('./documents/studentcard')
const teachercard = require('./documents/teachercard')



//@route POST api/filedownload/studentcard
//@desc Get the data to make the profilecard
//@access Public
router.post('/studentcard',(req,res)=>{


  const {name,classNo,roll,password} = req.body


  pdf.create(studentcard(name,classNo,roll,password),{}).toFile('PROFILE_CARD.pdf',(err) => {
    if(err) {
      res.send(Promise.reject())
    }
    res.send(Promise.resolve())
  })
})



//@route GET api/filedownload/profilecard
//@desc Send the profilecard
//@access Public
router.get('/profilecard', (req, res) => {
    res.sendFile(`${__dirname}/PROFILE_CARD.pdf`)
})

//@route POST api/filedownload/teachercard
//@desc Get the data to make the profilecard
//@access Public
router.post('/teachercard',(req,res)=>{


  const {name,username,password} = req.body


  pdf.create(teachercard(name,username,password),{}).toFile('TEACHER_CARD.pdf',(err) => {
    if(err) {
      res.send(Promise.reject())
    }
    res.send(Promise.resolve())
  })
})

//@route GET api/filedownload/teachercard
//@desc Send the profilecard
//@access Public
router.get('/teachercard', (req, res) => {
    res.sendFile(`${__dirname}/TEACHER_CARD.pdf`)
})





module.exports = router;

