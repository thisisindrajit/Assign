var express = require("express");
var router = express.Router();

//importing the auth controller
const authControllers = require("../controllers/auth");

//importing the validator
const { check } = require('express-validator');

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Entering auth route...")
  next()
})
// define the signout route
router.get('/signout', authControllers.signout)

// define the signin route
router.post('/signin', [
  //checking whether it is an email
  check("email").isEmail().withMessage("Incorrect email! Please try again!"),
],authControllers.signin)

// define the register route
router.post('/register', [
  //check for firstname
  check("firstname").isLength({min:4}).withMessage("Firstname must be at least 4 characters long!"),
  //checking whether it is an email
  check("email").isEmail().withMessage("Incorrect email! Please try again!"),
  //password validation
  check("password").isLength({min:7}).withMessage('Password must be at least 7 characters long!')
  .matches(/[A-Z]/).withMessage('Password must contain atleast one capital letter!')
  .matches(/\d/).withMessage('Password must contain atleast one digit!')

],authControllers.register)
  

module.exports = router
