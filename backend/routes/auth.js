var express = require("express");
var router = express.Router();

//importing the auth controller
const authControllers = require("../controllers/auth");

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Entering auth route...")
  next()
})
// define the signout route
router.get('/signout', authControllers.signout)

// define the signin route
router.get('/signin', authControllers.signin)

// define the register route
router.get('/register', authControllers.register)
  

module.exports = router
