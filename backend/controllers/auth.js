//module.exports is an object which has a collection of key value pairs
module.exports = {
    
signout: (req, res) => {
  res.status(200).send("Successfully signed out!");
},

signin: (req, res) => {
  res.status(200).send("in sign in route!");
},

register: (req, res) => {
  res.status(200).send("in reg route!");
}
};
