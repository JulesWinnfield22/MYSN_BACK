const multer = require('multer')
const path = require("path")

const filSizeLimit = 5000000

const limits = {
	fileSize: filSizeLimit
}

function fileFilter(req, file, cb) {
	const exts = ['.png', '.jpg', '.jpeg', 'gif']
	const ext = path.extname(file.originalname)

	if(exts.some(item => item == ext)) {
		cb(null, true)
	} else {
		req.error = {
			message: 'Only images are allowed',
			code: 'ONLY_IMAGES_ALOWED',
			field: file.fieldname
		}
		return cb(null, false, 'Only images are allowed')
	}
}

module.exports = (options = {limits, fileFilter, path: './src/uploads/profilePics'}) => {
	
	const storage = multer.diskStorage({
		destination: function(req, file, cb) {
			cb(null, options.path)
		},
		filename: function(req, file, cb) {
			const ext = path.extname(file.originalname)
			cb(null,  "" + Date.now() + ext)
		}
	})

	return multer({
		storage, 
		limits: options.limits,
		fileFilter
	})
}

exports.Error = multer.MulterError