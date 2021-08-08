const user = require("../core/user")
const bcrypt = require('bcrypt')
const { getVerificationCode } = require('../util')
const { SECRET } = require('../../config')
const jwt = require('jsonwebtoken')
const sendEmail = require('../middleware/sendEmail')

const upload = require('../../multer')().single('profile')

// function getVerificationCode() {
// 	return new Promise((resolve, reject) => {
// 		resolve()
// 	})
// }

function signToken(payload) {
	return jwt.sign(payload, SECRET)
}

async function getFreshToken() {
	const res = await user.getUser({ email: this.email })
	res.password = undefined
	return { token: signToken({ user: res }), user: res }
}

exports.verifyAccount = (req, res) => {
	user.getUser({_id: req.user._id}, {token: 1})
		.then( ({_id, token}) => {
			if (req.body.code === token) {
				
				(user.setVerified(_id))
					.then(resp => {
						user.token = undefined
						res.json({
							token: signToken({ user: {...req.user, verified: true} }),
							user:{
								...req.user,
								verified: true
							},
						})
					})
					.catch(err => {
						res.status(500).send('something went wrong please try again!')
					})
				
			} else {
				res.status(401).send('the code is not right')
			}
		})
		.catch(err => {
			res.status(500).send('something went wrong please try again!')
		})
}

exports.signupUser = (req, res) => {
	(user.signupUser({...req.body}))
		.then(user => {
			user.password = undefined
			user.token = undefined
			const token = signToken({ user })
			res.json({
				token,
				verified: user.verified
			})
			sendEmail(user, req.body.token)
		})
		.catch(e => {
			res.status(400).send('Bad Request')
		})
}


exports.login = ({ body }, res) => {
	user.getUser({ email: body.email })
		.then(user => {
			bcrypt.compare(body.password, user.password, function (err, bool) {
				if (bool) {
					user.password = undefined
					const token = signToken({ user })
					res.json({
						token,
						user
					})
				} else {
					res.status(400).send('wrong password')
				}
			})
		})
		.catch(err => {
			res.status(400).send('Bad Request')
		})
}

exports.addProfile = (req, res) => {
	upload(req, res, function (err) {
		if (err) {
			res.json(err)
		} else if (req.error) {
			res.json(req.error)
		}

		user.addProfile({
			_id: req.user?._id,
			path: req.file.path.replace('src/uploads', '')
		})
			.then((response) => {

				getFreshToken.call(req.user)
					.then(resu => {
						res.json({
							token: resu.token,
							profile: resu.user.profile,
							successful: true
						})
					})
					.catch(err => {
						res.json('err')
					})

			})
			.catch(err => {
				res.send('error')
			})
	})
}

exports.addFirstName = (req, res) => {
	console.log(req.user, '......', req.body)
	user.addFirstName({ _id: req.user?._id, name: req.body?.firstname })
		.then(async result => {
			const { token, user } = await getFreshToken.call(req.user)
			res.json({
				token,
				firstname: user.firstname,
				successful: true
			})
		})
		.catch(err => {
			res.send('err')
		})
}

exports.addLastName = (req, res) => {
	user.addLastName({ _id: req.user?._id, name: req.body?.lastname })
		.then(async result => {
			const { token, user } = await getFreshToken.call(req.user)
			res.json({
				token,
				lastname: user.lastname,
				successful: true
			})
		})
		.catch(err => {
			res.send(err)
		})
}

exports.addBio = (req, res) => {
	user.addBio({ _id: req.user?._id, bio: req.body?.bio })
		.then(async result => {
			const { token, user } = await getFreshToken.call(req.user)
			res.json({
				token,
				bio: user.bio,
				successful: true
			})
		})
		.catch(err => {
			res.send("error")
		})
}

exports.addUsername = (req, res) => {
	user.addUsername({ _id: req.user?._id, username: req.body?.username })
		.then(async result => {
			const { token, user } = await getFreshToken.call(req.user)
			res.json({
				token,
				username: user.username,
				successful: true
			})
		})
		.catch(err => {
			res.send("error")
		})
}