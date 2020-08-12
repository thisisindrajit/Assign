var mongoose = require("mongoose");
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');

var userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
    minlength: 4,
  },
  lastname: {
    type: String,
    trim: true
  },
  organisation: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  description: {
    type: String,
    trim: true
  },
  tasks: [
    {
      teamid: String, //to get the id of the team
      taskid: String //to get the id of the task
    },
  ],
  encrypted_password: {
    type: String,
    required: true
  },
  salt: String
});

userSchema.virtual("password") //this won't be stored in the database or represented in the Schema
  .set(function(password) {
     this._password = password;
     this.salt = uuidv1();
     this.encrypted_password = this.encryptPassword(password); //this calls the function to encrpyt the password
    
  })
  .get(function() {
     return this._password;
  })


userSchema.method({
  authenticate: function(plainpassword)
  {
    return this.encryptPassword(plainpassword) === this.encrypted_password;
  },
  encryptPassword: function(plainpassword)
  {
    if(!plainpassword) return ""; //returning nothing in case no password is given
    
    try {

      return crypto.createHmac('sha256', this.salt) //salt is for extra security
      .update(plainpassword) //the string which you want to encrypt
      .digest('hex');

    } catch (err) {
      return "";
    }
  }
});

module.exports = mongoose.model("User", userSchema);

// const User = mongoose.model("User", userSchema);

// const doc = new User();

// doc.password = "Indrajit";

// console.log(doc._id);
// console.log(doc.password);
// console.log(doc.encrypted_password);
// console.log(doc.authenticate(doc.password));