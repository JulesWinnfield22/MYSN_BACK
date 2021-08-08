import { Schema, model } from 'mongoose'

const postSchema = new Schema({
	user: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	}
})

export default model('Post', postSchema)