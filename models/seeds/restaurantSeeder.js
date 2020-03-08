const mongoose = require('mongoose')
const restaurantList = require('./restaurant.json')
const Restaurant = require('../restaurant.js')
const User = require('../user.js')


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
  User.findOne({ 'name': 'user1' })
    .lean()
    .exec((err, user) => {
      if (err) return console.log(err)
      for (let i = 0; i < restaurantList.results.length - 3; i++) {
        restaurantList.results[i].userId = user._id
        Restaurant.create(restaurantList.results[i])
      }
    });

  User.findOne({ 'name': 'user2' })
    .lean()
    .exec((err, user) => {
      if (err) return console.log(err)
      for (let i = 3; i < restaurantList.results.length; i++) { //讓user2有4.5.6號餐廳
        restaurantList.results[i].userId = user._id
        Restaurant.create(restaurantList.results[i])
      }
    })
  console.log('done')
})

