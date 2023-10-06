const Thoughts = require('../models/Thoughts')
const User = require('../models/User')

module.exports = class ThoughtsController {
	static async showThoughts(req, res){
		return res.render('thoughts/home')
	}
}
