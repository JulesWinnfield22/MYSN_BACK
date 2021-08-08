const userRoute = require('express').Router()
const { addProfile, addFirstName, addLastName, addBio, addUsername } = require('../../controllers/user')

userRoute.get('/', (req, res) => {
	
	if(req.user?.profile) {
		res.json({
			...req.user,
			profile: 'http://localhost:3001' + req.user.profile
		})
	} else {
		res.json(req.user)
	}

})

userRoute.get('/verified', (req, res) => {
	res.json({
		verified: req.user?.verified
	})
})

userRoute.post('/profile', addProfile)

userRoute.post('/firstname', addFirstName)

userRoute.post('/username', addUsername)

userRoute.post('/lastname', addLastName)

userRoute.post('/bio', addBio)

module.exports = userRoute