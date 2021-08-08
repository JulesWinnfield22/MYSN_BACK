// const session = require('express-session')
// const MongoStore = require('connect-mongodb-session')(session)

// const { SECRET } = require('../../config')
// const NODE_ENV = 'dev'
// const MAX_AGE = 1000 * 3600 * 2
// const SESS_NAME = 'sid'

// const store = new MongoStore({
// 	uri: 'mongodb://localhost:27017',
// 	databaseName: 'social',
// 	collection: 'session'
// })

// const config = {
// 	name: SESS_NAME,
// 	saveUninitialized: false, 
// 	resave: false,
// 	secret: SECRET,
// 	store,
// 	cookie: {
// 		maxAge: MAX_AGE,
// 		sameSite: true,
// 		secure: NODE_ENV != 'dev'
// 	}
// }

// module.exports = () => session(config)
