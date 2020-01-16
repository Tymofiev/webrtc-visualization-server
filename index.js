const express = require('express')
const bodyParser = require('body-parser')

const statsRoute = require('./routes/stats')

const app = express()

// app.use((req, res, next) => {
// 	res.set({
// 		'Access-Control-Allow-Origin': '*',
// 		'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
// 		'Access-Control-Allow-Headers': 'Content-Type',
// 	})
// 	next()
// })

app.use(bodyParser.json())
app.use('/stats', statsRoute)

app.get('/', (req, res) => {
	res.send('Start')
})

app.listen(3001, console.log('Listening on port 3001...'))
