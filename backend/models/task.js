var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema; //destructuring

var taskSchema = mongoose.Schema(
  {
    team_belonging_to: {
      type: ObjectId,
      ref: "Team",
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    resources: {
      //to have some helpful links to aid in the completion of the task (optional)
      type: String,
      trim: true,
    },
    assigned_to: {
      type: ObjectId, //storing user id of the user to which this task has been assigned
      ref: "User",
      required: true,
    },
    difficulty_level: {
      //to set the difficulty level of the task ranging from 1 to 5
      type: Number,
      required: true,
    },
    due_date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);
