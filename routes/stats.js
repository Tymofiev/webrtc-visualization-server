const express = require('express')
const router = express.Router()

const { findAll, findById, findByLessonId } = require('../lib/db')

router.get('/', (req, res) => {
	const { filter } = req.query

	if (!filter) {
		findAll(res)
	} else {
		findByLessonId(filter.lesson_id, res)
	}
})

router.get('/:id', (req, res) => {
	findById(req, res)
})

module.exports = router
