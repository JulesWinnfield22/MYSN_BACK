module.exports = function({ body }, res, next) {
	if(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(body.email) && 
		/^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(body.password) && /^[a-zA-Z0-9]{4,}$/.test(body.username)) {
		next()
	} else {
		res.send("not a valid user data!")
	}
}