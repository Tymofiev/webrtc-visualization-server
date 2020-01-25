const express = require('express')
const { Pool } = require('pg')
const config = require('config')

const StatSerializer = require('../lib/serializer')
const router = express.Router()

const connectionString = config.get('connectionString')

const pool = new Pool({
	connectionString: connectionString,
})

router.get('/', (req, res) => {
	pool.connect((err, client, done) => {
		client
			.query('select * from public.statistics limit 10;')
			.then((result) => {
				var stats = StatSerializer.serialize(result.rows)
				//res.send(stats)
				res.send(config.get('all-data'))
				done()
			})
			.catch((e) => console.error(e.stack))

		if (err) {
			return console.error('Error running query', err)
		}
	})
})

router.get('/:id', (req, res) => {
	const { id } = req.params
	pool.connect((err, client, done) => {
		client
			.query(`select * from public.statistics where id = ${id}`)
			.then((result) => {
				var stats = StatSerializer.serialize(result.rows)
				const obj = {
					data: stats.data[0],
				}
				res.send(config.get('single-data'))
				done()
			})
			.catch((e) => console.error(e.stack))

		if (err) {
			return console.error('Error running query', err)
		}
	})
})

module.exports = router
