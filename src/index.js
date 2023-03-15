const express = require('express')
const morgan = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')
const router = require('./routes/router.js')
require('./db/config.js')


const app = express()
app.use(morgan('dev'))
app.set('port', process.env.PORT || 3000)
app.use(bodyParser.urlencoded({ extended:true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, '/public')))

app.use(router)

app.get('/api/hello', (req, res) => {
    return res.json({ greeting: 'hello API' })
})


app.listen(app.get('port'), console.log(`Listening on port: ${app.get('port')}`))