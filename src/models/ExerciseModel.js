const mongoose = require('mongoose')

const ExerciseModel =  mongoose.Schema({
    username: { type: String, trim: true },
    description: {type: String},
    duration: {type: Number},
    date: {type:String}
})



module.exports = mongoose.model("exercise", ExerciseModel)