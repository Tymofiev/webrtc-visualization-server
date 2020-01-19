const express = require('express')
const { Client } = require('pg')
const config = require('config')

const router = express.Router()
const connectionString = config.get('connectionString')
const client = new Client({
	connectionString: connectionString,
})

router.get('/', (req, res) => {
	client
		.connect()
		.then(() => {
			console.log('Connected')
			client
				.query('select * from public.statistics;')
				.then((result) => res.send(result.rows))
				.catch((e) => console.error(e.stack))
		})
		.catch((e) => console.error(e.stack))
})

router.get('/:id', (req, res) => {
	const { id } = req.params

	client
		.connect()
		.then(() => {
			client
				.query(`select * from public.statistics where id = ${id}`)
				.then((result) => res.send(result.rows))
				.catch((e) => res.send(e.stack))
		})
		.catch((e) => res.send(e.stack))
})

module.exports = router
