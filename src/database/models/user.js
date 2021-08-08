const { Schema, model } = require('mongoose')

const userSchema = new Schema({
	username: {
		type: String,
		minlength: [4, 'the value "{VALUE}" is shorter than expected'],
		required: true
	},
	firstname: {
		type: String
	},
	lastname: {
		type: String
	},
	bio: {
		type: String
	},
	profile: {
		type: String
	},
	password: {
		type: String,
		minlength: [6, 'the value "{VALUE}" is shorter than expected'],
		required: true
	},
	email: {
		type: String,
		validate: {
			validator: function(email) {
				var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
   			return emailRegex.test(email)
			},
			message: props => `${props.value} is not a valid email`
		},
		required: true
	},
	verified: {
		type: Boolean,
		default: false
	},
	token: String,
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	}
})

module.exports = model('User', userSchema)