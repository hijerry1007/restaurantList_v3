const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use('/', require('./routes/home'))
app.use('/restaurants', require('./routes/restaurant'))
//載入db
const mongoose = require('mongoose')
//connect to db
mongoose.connect('mongodb://localhost/restaurant', {
  useNewUrlParser: true, useUnifiedTopology: true
})
//get db info
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

//require db model
const Restaurant = require('./models/restaurant')


// search function

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  Restaurant.find((err, restaurants) => {
    if (err) return console.error(err)
    const searchList = restaurants.filter(restaurant => {
      restaurant.name.toLowerCase().includes(keyword.toLowerCase())
      console.log(searchList)
    })
    return res.render('index', { restaurant: restaurants, keyword: keyword })

  })

})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})