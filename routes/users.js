const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
	res.send({
		data: {
			type: 'user',
			id: 1,
			attributes: {
				login: '1',
				password: '2',
				posts: [],
			},
		},
	})
})

module.exports = router
