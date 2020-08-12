var mongoose = require("mongoose");
var randtoken = require("rand-token");

var teamSchema = mongoose.Schema({
  team_id: {
    type: String,
    default: function () {
      return randtoken.generate(20); //generating a random token consisting of 20 characters. This will be acting as the team id.
    },
    unique: true,
  },
  team_name: {
    type: String,
    required: true,
    trim: true,
    minlength: 4,
  },
  organisation: {
    type: String,
    required: true,
    trim: true,
  },
  team_leader: {
    type: String, //the value will be the user id of the user who creates the team
    required: true,
  },
  team_members: {
    type: Array, //stores array of user ids of the team members
  },
  starred_members: {
    type: Array, //stores array of user ids of the starred members
  },
  tasks_list: [
    {
      userid: String, //to get the id of the user
      taskid: String, //to get the id of the task
    },
  ],
});

module.exports = mongoose.model("Team", teamSchema);
