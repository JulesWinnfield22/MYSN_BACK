const api = require('express').Router()
const userRoute = require('./user')

api.use('/user', userRoute)

api.get('/post', (req, res) => {
	res.json({
		id: '1',
		name: 'post'
	})
})

api.get('/event', (req, res) => {
	res.json({
		id: '1',
		name: 'event'
	})
})

module.exports = api