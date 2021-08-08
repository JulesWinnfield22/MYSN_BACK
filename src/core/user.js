const User = require('../database/models/user')

exports.signupUser = async (data) => {
	console.log(data, 'core')
	const user = await new User(data).save()
	return user
}

exports.getUser = async (option = {}, only, except = {createdAt: 0, updatedAt: 0, __v: 0}) => {
	const user = await User.findOne(option, only || except)
	return user
}

exports.setVerified = async (id) => {
	return await User.updateOne({_id: id}, {verified: true})
}

exports.addProfile = async ({ _id, path }) => {
	return await User.updateOne({ _id }, {profile: path})
}

exports.addFirstName = async ({ _id, name }) => {
	return await User.updateOne({ _id }, { firstname: name })
}

exports.addLastName = async ({ _id, name }) => {
	return await User.updateOne({ _id }, { lastname: name })
}

exports.addBio = async ({ _id, bio }) => {
	return await User.updateOne({ _id }, { bio })
}

exports.addUsername = async ({ _id, username }) => {
	return await User.updateOne({ _id }, { username })
}