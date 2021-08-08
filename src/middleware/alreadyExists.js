const User = require('../database/models/user')
module.exports = async function({body}, res, next) {
	const user = await User.find({
		$or: [{ username: body.username }, { email: body.email }]
	})
	if(user.length == 0) next()
	else res.status(400).send('email or username alrady exists')
}