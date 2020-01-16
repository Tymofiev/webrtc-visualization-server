const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
	res.send({ isWorking: true, text: 'lets get it started' })
})

router.post('/', (req, res) => {})

router.get('/:id', (req, res) => {})

module.exports = router
