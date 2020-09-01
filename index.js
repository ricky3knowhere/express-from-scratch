const express = require('express')
const app = express()

const config = require('./config')
const checkIsLogin = require('./lib/checkIsLoggedIn')
const checkDb = require('./routes/check-db')
const { rootDir } = require('./helpers/path')

const bodyParser = require('body-parser')
const portfinder = require('portfinder')
const morgan = require('morgan')
const expressHbs = require('express-hbs')
const path = require('path')

const viewsPath = path.join(rootDir, 'views')

app.use('/uploads', express.static('uploads'))

app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: true }))

const fileUpload = require('express-fileupload')

app.use(
  fileUpload({
    createParentPath: true,
    useTempFiles : true,
  })
)

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
const users = require('./routes/users')

const logOut = require('./lib/logOut')

app.get('/', (req,res) => res.redirect('/login'))

app.get('/login', login.get)
app.post('/login', login.post)
app.get('/logout', logOut)

app.get('/dashboard', checkIsLogin, dashboard)

app.get('/users', checkIsLogin, users.list)
app.get('/users/create', checkIsLogin, users.create_get)
app.post('/users/create', checkIsLogin, users.create_post)

app.get('/users/:id', checkIsLogin, users.details)

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