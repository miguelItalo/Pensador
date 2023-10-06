const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = class AuthController{
	static async login(req, res){
		return res.render('auth/login')
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

		// criptografar a senha do usuário

		// criar objeto usuário para cadastro no banco

		// try Inserir usuário no banco e trabalhar com sessão
	};
};
