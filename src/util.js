exports.getVerificationCode = () => {
	return new Promise((resolve, reject) => {
		let code = Math.random().toString(36).substring(2, 8)
		if(code) {
			resolve(Math.random().toString(36).substring(2, 8))
		} else {
			reject('some thing went wrong')
		}
	})
}