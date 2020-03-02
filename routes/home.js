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

// search function

router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const regexp = new RegExp(keyword, "i")
  Restaurant.find({ $or: [{ name: { $regex: regexp } }, { category: { $regex: regexp } }] })
    .sort({ name: 'asc' })
    .lean()
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      return res.render('index', { restaurant: restaurants })
    })
})

router.get('/search/rating', (req, res) => {
  Restaurant.find()
    .sort({ rating: 'asc' })
    .lean()
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      console.log(restaurants)
      return res.render('index', { restaurant: restaurants })
    })
})

module.exports = router