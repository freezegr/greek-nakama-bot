const api = require('../api/api.js')
api.projects().then(res => {
	console.log(res)
})