var mongoose = require('mongoose');

var taskSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    resources:{ //to have some helpful links to aid in the completion of the task (optional)
        type:String,
        trim:true
    },
    assigned_to:{
        type:String, //storing user id of the user to which this task has been assigned
        required:true
    },
    difficulty_level:{ //to set the difficulty level of the task ranging from 1 to 5
        type:Number,
        required:true
    },
    due_date:{
        type:Date,
        required:true
    }
})

module.exports = mongoose.model("Task",taskSchema);