const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const statsRoute = require('./routes/stats')
const usersRoute = require('./routes/users')

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use('/statistics', statsRoute)
app.use('/users', usersRoute)

app.get('/', (req, res) => {
	res.send('Home page')
})

app.listen(3001, console.log('Listening on port 3001...'))
