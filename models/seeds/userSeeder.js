const mongoose = require('mongoose')
const restaurantList = require('./restaurant.json')
const userList = require('./users.json')
const User = require('../user.js')
const bcrypt = require('bcryptjs')

mongoose.connect('mongodb://localhost/restaurant', {
  useNewUrlParser: true, useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', () => {
  console.log('mongo error')
})

db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < userList.results.length; i++) {

    bcrypt.genSalt(10, (err, salt) => { //順帶幫user1加密
      bcrypt.hash(userList.results[i].password, salt, (err, hash) => {
        if (err) throw err
        userList.results[i].password = hash
        User.create(userList.results[i]);
      })
    });


  }
  console.log('done')
})


