const UserModel = require('../models/UserModel.js')
const ExerciseModel = require('../models/ExerciseModel.js')
const LogModel = require('../models/LogModel.js')

const createUser = async (req, res, next) => {
    const { username } = req.body
    const doc = await UserModel.findOne({username: username})
    if (doc) {
        return res.json({_id:doc._id, username:doc.username})
    }
    const newDoc = await UserModel.create({
        username: username,
    })
    await LogModel.create({
        _id: newDoc._id,
        username: newDoc.username
    })
    return res.json({username:newDoc.username, _id:newDoc._id})
}
const getUsers = async (req, res, next) => {
    const data = await UserModel.find()
    return res.json(data)
}
const addExercise = async (req, res, next) => {
    let { description, duration, date, id } = req.body
    const {_id} = req.params
    duration = Number(duration)
    if(date == '') date = new Date().toDateString()
    const userDoc = await UserModel.findOne({_id:_id})
    if(!userDoc) return res.json({error: 'Invalid Id'})
    const newExercise = {
        _id: userDoc._id,
        username: userDoc.username,
        description,
        duration,
        date: new Date(date).toDateString() 
    }
    const logDoc = await LogModel.findOneAndUpdate({username:userDoc.username}, {$inc: {count: 1}})
    date = new Date(date).toDateString()
    logDoc.log.push({description, duration, date})
    logDoc.save()
    console.log(newExercise)
    return res.json(newExercise)
}
const getLogs = async (req, res, next) => {
    const {_id} = req.params
    let {from, to, limit} = req.query
    const doc = await LogModel.findById(_id)
    if (from && to) {
        let doc2 = Object.assign({}, doc._doc)
        let startDate = new Date(from)
        let endDate = new Date(to)
        let logFiltered = doc2.log.filter(log => {
            if (new Date(log.date) >= startDate && new Date(log.date) <= endDate) {
                return log.date
            } 
        })
        doc2.log = logFiltered
        doc2.count = logFiltered.length
        if (limit) {
            limit = Number(limit)
            doc2.log = doc2.log.slice(0, limit)
            doc2.count = doc2.log.length
        }
        return res.json(doc2)
    }
    if (limit) {
        limit = Number(limit)
        doc.log = doc.log.slice(0, limit)
        doc.count = doc.log.length
    }
    console.log(doc)
    return res.json(doc)
}


module.exports = {
    createUser,
    getUsers,
    addExercise,
    getLogs
}