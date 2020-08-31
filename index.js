const express = require('express')
const app = express()
const config = require('./config')
const checkIsLogin = require('./lib/checkIsLoggedIn')
const checkDb = require('./routes/check-db')

const login = (req, res) => res.send('login')
const dashboard = (req, res) => res.send('dashboard')

const portfinder = require('portfinder')
const morgan = require('morgan')

app.use(morgan('combined'))

app.get('/', (req,res) => res.redirect('/login'))
app.get('/login', login)
app.get('/dashboard', checkIsLogin, dashboard)

app.get('/check_db', checkDb)


const run = async () => {
  try {
    const port = await portfinder.getPortPromise({
      port: config.port
    })

    app.listen(port, () => console.log('Server running at port:'+port))
  
  } catch(e) {
    console.log(e);
  }
}

run()