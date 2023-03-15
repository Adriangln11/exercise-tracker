const mongoose = require('mongoose')

const LogsModel =  mongoose.Schema({
    username: { type: String, trim: true },
    count: {type:Number, default:0},
    log: {type:Array, default:[]}
})



module.exports = mongoose.model("log", LogsModel)