const express = require('express')
const app = express()

const config = require('./config')
const checkIsLogin = require('./lib/checkIsLoggedIn')
const checkDb = require('./routes/check-db')
const bodyParser = require('body-parser')

const portfinder = require('portfinder')
const morgan = require('morgan')
const expressHbs = require('express-hbs')

const path = require('path')
const rootDir = path.resolve(__dirname)
const viewsPath = path.join(rootDir, 'views')

app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: true }))

//Express Session Start
const session = require('express-session')
const sessionStore = require('express-session-sequelize')
const SessionStore = sessionStore(session.Store)
const db = require('./models')
const sequelizeSessionStore = new SessionStore({
  db: db.sequelize
})

app.use(session({
  secret: 'anystringvalue',
  saveUninitialized: true,
  cookie: { secure: 'auto' },
  resave: false,
  store: sequelizeSessionStore
}))
//Express Session End


// View Engine Start
app.engine('hbs', expressHbs.express4({
  partialsDir: path.join(viewsPath, 'components'),
  defaultLayout: path.join(viewsPath, 'layouts/default.hbs'),
  layoutsDir: path.join(viewsPath, 'layouts')
}))
app.set('view engine', 'hbs');
app.set('views', viewsPath);
// View Engine End


// Route Start
const login = require('./routes/login')
const dashboard = (req, res) => res.render('./pages/dashboard')
const users = (req, res) => res.render('./pages/users', { data : 'this is the data' })

const logOut = require('./lib/logOut')

app.get('/', (req,res) => res.redirect('/login'))
app.get('/login', login.get)
app.post('/login', login.post)
app.get('/logout', logOut)

app.get('/dashboard', checkIsLogin, dashboard)
app.get('/dashboard/users', checkIsLogin, users)
app.get('/check_db', checkDb)
// Route End


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