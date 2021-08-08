const express = require('express')
const path = require('path')
const cors = require('cors')
const commanRouts = require('./src/router/comman')
const api = require('./src/router/api')
const verifyUser = require('./src/middleware/verifyUser')

require('./src/database/db.js')

const app = express()

app.use(express.json())
app.use(express.urlencoded({
	extended: true
}))

app.use( cors(), commanRouts)

app.use('/api', cors(), verifyUser, api)

app.use( cors(), verifyUser, express.static( path.join(__dirname + '/src/uploads'), {
	dotfile: 'ignore',
	extenstions: ['.png', '.gif', '.jprg', '.jpg'],
	index: false
}))

app.listen(3001, () => {
	console.log('server on, on port 3001')
})