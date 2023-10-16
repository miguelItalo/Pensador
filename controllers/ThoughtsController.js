const Thoughts = require('../models/Thoughts')
const User = require('../models/User')

module.exports = class ThoughtsController {
	static async showThoughts(req, res){
		return res.render('thoughts/home')
	}
	static async dashboard(req, res){
		return res.render('thoughts/dashboard')
	}
	static createThoughts(req, res){
		return res.render('thoughts/create')
	}
	static async createThoughtsSave(req, res){
		const thought = {
			title: req.body.title,
			UserId: req.session.userId
		}

		try{
			Thoughts.create(thought)

			req.flash('message', 'Pensamento criado com sucesso!');
			req.session.save(() => {
				res.redirect('/thoughts/dashboard');
			});
		} catch(err){
			console.log(err)
		}
	}
}
