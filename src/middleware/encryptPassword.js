const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = function({body}, res, next) {
	bcrypt.genSalt(saltRounds, function(err, salt) {
		bcrypt.hash(body.password, salt, function(err, hash) {
			body.password = hash;
			next()
		})
	})
}