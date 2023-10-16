const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = class AuthController{
	static async login(req, res){
		return res.render('auth/login')
	};
	static async loginPost(req, res){
		const { email, password } = req.body;

		const user = await User.findOne({ where: { email: email } });

		if(!user){
			req.flash('message', 'Usuário não encontrado');
			return res.redirect('/login');
		};

		const passwordMatch = bcrypt.compareSync(password, user.password);
		console.log(passwordMatch)
		if(passwordMatch){
			req.flash('message', 'Senha Inválida');
			return res.render('auth/login');
		};

		req.session.userId = user.id;
		req.flash('message', 'Autenticação realizada com sucesso');
		req.session.save(() => {
			res.redirect('/');
		});

	};

	static async register(req, res){
		return res.render('auth/register')
	};
	static async registerPost(req, res){
		const { name, email, password, confirmpassword } = req.body

		if(password != confirmpassword){
			req.flash('message', 'As senhas não conferem, tente novamente');
			return res.render('auth/register')
		}

		// validação de email - Verificar se email já está cadastrado
		const checkIfUserExist = await User.findOne({ where: { email: email } })
		if(checkIfUserExist){
			req.flash('message', 'O e-mail já está em uso!');
			res.render('auth/register')
			return
		}
		// criptografar a senha do usuário
		const salt = bcrypt.genSaltSync(10)
		const hashedPassword = bcrypt.hashSync(password + salt)

		// criar objeto usuário para cadastro no banco
		const user = {
			name,
			email,
			password: hashedPassword
		}

		// try Inserir usuário no banco e trabalhar com sessão

		try{
			const createdUser = await User.create(user)

			req.session.userId = createdUser.id
			req.flash('message', 'Cadastro realizado com sucesso!');
			req.session.save(() => {
				res.redirect('/')
			})

		} catch(err) {
			console.log(err)
		}
	};
	static async logout(req, res){
		req.session.destroy()
		res.redirect('/login')
	}
};
