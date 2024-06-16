const { Router } = require('express');
const jwt = require('jsonwebtoken');
const router = Router();
const userMiddleware = require('../middleware/user');
const { User, Course } = require("../db");

router.post('/signup', async (req, res) =>{
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });

    if(existingUser){
      return res.status(400).json({message: "username already exists"});
    }

    const newUser = await User.create({ username, password });

    res.json({ message: "user created successfully", user: newUser});
  } catch (error) {
    
    console.error("Error in user signup:", error);
    res.status(500).json({ message: "Internal server error"});
  }
});

router.post('/signin', async (req, res) =>{
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if(!user || user.password !== password){
      return res.status(401).json({ message: "Invalid username or password"});

      const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h'});

      res.json({ token });
    }
  } catch (error) {

    console.error("error in user singin:", error);
    res.status(500).json({ message: "Internal server error"});
    
  }
});

router.get('/courses', async (req, res) =>{
try {
    const courses = await Course.find({});
    res.json({ courses });
} catch (error) {
   console.error("Error in fetching courses: ", error);
   res.status(500).json({ message: "Internal server error"});
}
});

router.post('/courses/:courseId', userMiddleware, async( req ,res) =>{
  try {
    const courseId = req.params.courseId;
    const username = req.username;

    res.json({ message: 'Course purchased successfully'});
  } catch (error) {
    console.error("Error in purchasing course:", error);
    res.status(500).json({ message: "Internal server error"});
  }
});

router.get('/purchasedCourse', userMiddleware, async (req, res) =>{
  try {
     const username = req.username;

     res.json({ message: 'Purchased courses fetched successfully'});
  } catch (error) {
    console.error("Error in fetching purchased courses:", error);
    res.status(500).json({ message: "Internal server error"});
  }
});

module.exports = router;