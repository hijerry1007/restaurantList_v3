const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))



//載入db
const mongoose = require('mongoose')
//connect to db
mongoose.connect('mongodb://localhost/restaurant', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})
//get db info
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.use(session({
  secret: "copy-cat",
  resave: false,
  saveUninitialized: true,
}))

app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport)

app.use((req, res, next) => {

  res.locals.user = req.user
  //辨識使用者是否登入 => view 使用
  res.locals.isAuthenticated = req.isAuthenticated()
  next()
})

app.use('/', require('./routes/home'))
app.use('/restaurants', require('./routes/restaurant'))
app.use('/users', require('./routes/user'))

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})