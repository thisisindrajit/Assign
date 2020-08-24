const User = require("../models/user");
const { validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJWT = require("express-jwt");

//module.exports is an object which has a collection of key value pairs
module.exports = {
  signout: (req, res) => {
    res.status(200).send("Successfully signed out!");
  },

  signin: (req, res) => {
    const { email, password } = req.body; //extracting email and password from req.body object

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      //req has some errors
      return res.status(400).json({
        errors: errors.array().map((val) => {
          return {
            parameter: val.param,
            message: val.msg,
          };
        }),
      });
    }

    User.findOne({ email }, (err, user) => {

      //if there is an error or there is no user with the specified email
      if (err || !user) {
        return res.status(400).json({
          Error: "E-mail does not exist!",
        });
      }

      if (!user.authenticate(password)) {
        return res.status(401).json({
          //401 means that correct authorization credentials have not been provided to access the target resource
          Error: "Email and password do not match!",
        });
      }

      //after user has been authenticated...

      //creating a json web token
      const token = jwt.sign({ _id: user._id }, process.env.SECRET);

      //put token into user's device using cookies
      res.cookie("token", token, { expire: new Date() + 9999 }); //TODO - change the expires value later

      res.status(200).json({
        token,
        user: {
          _id: user._id,
          firstname: user.firstname,
          email: user.email,
        },
      });
    });
  },

  register: (req, res) => {
    //console.log("REQ BODY", req.body); //req.body holds the entire json request in the form of an object

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      //req has some errors
      return res.status(400).json({
        errors: errors.array().map((val) => {
          return {
            parameter: val.param,
            message: val.msg,
          };
        }),
      });
    }

    const user = new User(req.body); //sending request body as parameter to the constructor of the Schema

    user.save((err, user) => {
      //err is the error and user is the user which has been stored in the database
      if (err) {
        return res
          .status(400)
          .json({ Error: "User cannot be stored in database!" }); //400 means a bad request
      }

      res.status(200).json({
        id: user._id,
        firstname: user.firstname,
        organisation: user.organisation,
        email: user.email,
      });
    });
  },
};
