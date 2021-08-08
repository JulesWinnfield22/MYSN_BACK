const jwt = require('jsonwebtoken')
const { SECRET } = require('../../config')

function verifyUser(req, res, next) {
	let token = req.headers.authorization?.split(' ')[1]
	if(!token) 	token = req.query.token
	// console.log(token)
	
	if(!token) res.status(401).send('Unautorized')
	else {
		jwt.verify(token?.replace(/"/g, ''), SECRET, function(err, decoded) {
			if(err) res.status(401).send('Unautorized')
			else {
				req.user = decoded.user
				next()
			}
		})
	}

}

module.exports = verifyUser