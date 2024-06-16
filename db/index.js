const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://uc:9004061221@cluster0.1is4pgg.mongodb.net/')
.then(() =>{
  console.log("Connected to database");
})
.catch((error) =>{
  console.error("error connecting to database: ", error);
});

const AdminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourses: [{
    type: mongoose.Types.ObjectId,
    ref: 'Course'
  }]
});

const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageLink: String,
  price: Number,
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
  Admin,
  User,
  Course
}