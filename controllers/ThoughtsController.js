const Thoughts = require('../models/Thoughts')
const User = require('../models/User')

module.exports = class ThoughtsController {
	static async showThoughts(req, res){
		return res.render('thoughts/home')
	}
	static async dashboard(req, res){
		const userId = req.session.userId

		// select com join SEQUELIZE

		const user = await User.findOne({
			where: { id: userId },
			include:	Thoughts,
			plain: true
		})

		if(!user){
			res.redirect('/login')
		}

		const thoughts = user.Thoughts.map((result) => result.dataValues)

		let emptyThoughts = false

		if(thoughts.length === 0){
			emptyThoughts = true
		}

		return res.render('thoughts/dashboard', { thoughts, emptyThoughts })
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
	static async deleteThoughts(req, res){
		try{
			const id = req.body.id
			await Thoughts.destroy({ where: { id: id } });

			req.flash('message', 'Pensamento deletado com sucesso!')

			req.session.save(() => {
				res.redirect('/thoughts/dashboard');
			})

		} catch(err) {
			console.log(err)
		}
	}
	static async editThoughts(req, res){
		try{
			const { id } = req.body
			const thought = await Thoughts.findOne({ where: { id: id} })
			console.log(thought.dataValues)
			res.render('thoughts/edit', {thought: thought.dataValues})

		} catch(err){
			console.log(err)
		}
	}
	static async editThoughtsSave(req, res){
		const { id, title } = req.body
		const userId = req.session.userId

		try{
			const newThought = {
				title
			}
			await Thoughts.update(newThought, { where:{ id: id, UserId: userId }})

			req.flash('message', 'Pensamento editado com sucesso!')

			req.session.save(() => {
				res.redirect('/thoughts/dashboard');
			});

		} catch(err){
			console.log(err)
		}
	}
}
