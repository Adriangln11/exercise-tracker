const mongoose = require('mongoose')
require('dotenv').config()



try {
    const db = mongoose.connect(process.env.MONGO_URI, { 'useNewUrlParser' : true,useUnifiedTopology: true })
        .then(response => console.log("Connected to ", response.connection.name))
    
    
} catch (error) {
    console.error(error)
}

mongoose.connection.on("connected", () => {
    console.log("Mongoose is connected")
})

mongoose.connection.on("disconnected", () => {
    console.log("Mongoose is disconnected")
})