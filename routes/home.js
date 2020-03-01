const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

//首頁
router.get('/', (req, res) => {
  Restaurant.find()
    .sort({ name: 'asc' })
    .lean()
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      return res.render('index', { restaurant: restaurants })
    })
})


module.exports = router