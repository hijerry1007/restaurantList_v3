const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

//載入  auth 中 的 middleware的 authenticated方法

const { authenticated } = require('../config/auth')

//首頁
router.get('/', authenticated, (req, res) => {
  Restaurant.find({ userId: req.user._id }) //只會找出使用者ID的資料
    .sort({ name: 'asc' })
    .lean()
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      return res.render('index', { restaurant: restaurants })
    })
})

// search function

router.get('/search', authenticated, (req, res) => {
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


module.exports = router