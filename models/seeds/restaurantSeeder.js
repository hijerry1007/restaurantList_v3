const mongoose = require('mongoose')
const restaurantList = require('./restaurant.json')
const Restaurant = require('../restaurant.js')

// connect with mongodb
mongoose.connect('mongodb://localhost/restaurant', {
  useNewUrlParser: true, useUnifiedTopology: true
})
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < restaurantList.results.length; i++) {
    console.log(restaurantList.results[i])
    Restaurant.create(restaurantList.results[i])
  }
  console.log('done')
})

