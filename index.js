const express = require('express')
const bodyParser = require('body-parser')

const statsRoute = require('./routes/stats')

const app = express()

app.use(bodyParser.json())
app.use('/stats', statsRoute)

app.get('/', (req, res) => {
	res.send('Home page')
})

app.listen(3001, console.log('Listening on port 3001...'))
