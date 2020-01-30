const { Pool } = require('pg')
const StatSerializer = require('../lib/serializer')

const config = require('config')
const connectionString = config.get('connectionString')

const pool = new Pool({
	connectionString: connectionString,
})

const findAll = (res) => {
	pool.connect((err, client, done) => {
		client
			.query('select * from public.statistics limit 100;')
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
}

const findById = (req, res) => {
	const { id } = req.params

	pool.connect((err, client, done) => {
		client
			.query(`select * from public.statistics where id = ${id}`)
			.then((result) => {
				var stats = StatSerializer.serialize(result.rows)
				const obj = {
					data: stats.data[0],
				}
				//res.send(obj)
				res.send(config.get('single-data'))
				done()
			})
			.catch((e) => console.error(e.stack))

		if (err) {
			return console.error('Error running query', err)
		}
	})
}

const findByLessonId = (lesson_id, res) => {
	res.send(
		config.get('all-data').data.filter((item) => {
			return item.attributes['lesson-id'] == lesson_id
		}),
	)
	// pool.connect((err, client, done) => {
	// 	client
	// 		.query(`select * from public.statistics where lesson_id = ${lesson_id}`)
	// 		.then((result) => {
	// 			var stats = StatSerializer.serialize(result.rows)
	// 			res.send(stats)
	// 			done()
	// 		})
	// 		.catch((e) => console.error(e.stack))

	// 	if (err) {
	// 		return console.error('Error running query', err)
	// 	}
	// })
}

module.exports = { findAll, findById, findByLessonId }
