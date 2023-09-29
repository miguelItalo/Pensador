const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const fileStore = require('session-file-store')(session)
const flash = require('express-flash')

const app = express()

const conn = require('./db/conn')

// import Models

// Import rotas

// Import Controller

// Configurar engine
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars')

// Configurar JSON
app.use(express.urlencoded({ extended:true }));
app.use(express.json())
// Middleware para as sessões

// Imnport as flash

// Import arquivos estáticos

// Armazenar as sessões nas rotas

// Rotas

// Conexão e criação das tabelas do banco

conn
	.sync()
	.then(() => {

	})
