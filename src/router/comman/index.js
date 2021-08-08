const route = require('express').Router()
const { signupUser, login, verifyAccount } = require('../../controllers/user')
const validateUser = require('../../middleware/validateUser')
const alreadyExists = require('../../middleware/alreadyExists')
const encryptPassword  = require('../../middleware/encryptPassword')
const verifyUser = require('../../middleware/verifyUser')
// const { getVerificationCode } = require('../../util')
route.post('/login', login)

route.post('/signup', validateUser, alreadyExists, encryptPassword, (req, res, next) => {
	let code = Math.random().toString(36).substring(2, 8)
	if(code) {
		req.body.token = code
		next()
	} else {
		res.status(500).send('cant create a verification code!')
	}
}, signupUser)

route.post('/verifyaccount', verifyUser, verifyAccount)

module.exports = route