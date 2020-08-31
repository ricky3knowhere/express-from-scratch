const express = require('express')
const app = express()
const config = require('./config')
const checkIsLogin = require('./lib/checkIsLoggedIn')

const login = (req, res) => res.send('login')
const dashboard = (req, res) => res.send('dashboard')

app.get('/', (req,res) => res.redirect('/login'))
app.get('/login', login)
app.get('/dashboard', checkIsLogin, dashboard)

app.listen(config.port, () => {})