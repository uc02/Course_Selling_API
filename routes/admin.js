const { Router } = require('express');
const adminMiddleware = require("../middleware/admin");
const { Admin, Course, User } = require("../db");
const {JWT_SECRET} = require("../config")

const router = Router();
const jwt = require("jsonwebtoken");

router.post('/signup', async (req, res) =>{

  const username = req.body.username;
  const password = req.body.password;

  await Admin.create({
    username: usename,
    password: password
  })
  .then(function () {res.status(201).json({message: "Admin created"})} )
  .catch(function (err){
    console.log('error in Saving user to database', err);
    return res.status(500).json({message: "an error occurred while creating the account."});
  });
})

router.post('/singin', async (req, res) =>{
  const username = req.body.username;
  const password = req.body.password;

  const isValidated = await User.find({
    username,
    password
  })
  if(User){
    const token = jwt.sing({
      username
    }, JWT_SECRET)
    res.json({
      token
    })
  }else{
    res.status(411).json({
      message: "Incorrect email and password"
    })
  }
})

router.post('/course', adminMiddleware, async (req, res) =>{

  const title = req.body.title;
  const description = req.body.description;
  const imagelink = req.body.imagelink;
  const price = req.body.price;

  const newCourse = await Course.create({
    title,
    description,
    imageLink,
    price
  })
  console.log(newCourse)
  res.json({
    message: "course created successfully"
    , courseId: newCourse._id
  })
});

router.get('/courses', adminMiddleware, async (req, res) =>{
  const response = await Course.find({});
  res.json({
    courses: response
  })
});

module.exports = router;
