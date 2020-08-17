var mongoose = require("mongoose");
var randtoken = require("rand-token");
const { ObjectId } = mongoose.Schema; //destructuring

var teamSchema = mongoose.Schema(
  {
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
      type: ObjectId, //the value will be the user id of the user who creates the team
      ref: "User",
      required: true,
    },
    team_members: [
      //stores array of team members
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    starred_members: [
      //stores array of starred members
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    tasks_list: [
      {
        type: ObjectId, //to get the id of the task
        ref: "Task", //referring to Task Schema
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Team", teamSchema);
