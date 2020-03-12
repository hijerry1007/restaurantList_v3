const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

const { authenticated } = require('../config/auth')
// sort
router.get('/sort', authenticated, (req, res) => {
  let sortTitle
  const sort = {
    title: [],
    keyword: '',
    value: '',
  }
  sort.title = req.query.sort

  if (sort.title === 'a-z') {
    sort.value = 1
  } else if (sort.title === 'z-a') {
    sort.value = -1
  } else if (sort.title === 'ratingHTL') {
    sort.value = -1
  } else if (sort.title === 'ratingLTH') {
    sort.value = 1
  } else if (sort.title === 'category') {
    sort.value = -1
  }

  // [] 使用變數的時候使用
  // .sort({ [sortKeyword]: sortValue }) //[sortKeyword] 代表的是 sortKeyword 裡面的值
  Restaurant.find({ userId: req.user._id })
    .sort({ [sort.title]: sort.value })
    .lean()
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      return res.render('index', { restaurant: restaurants, sort })
    })
})


//新增餐廳頁面
router.get('/new', authenticated, (req, res) => {
  res.render('new')
})

//顯示詳細資料
router.get('/:id', authenticated, (req, res) => {
  Restaurant.findOne({ _id: req.params.id, userId: req.user._id })
    .lean()
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      return res.render('show', { restaurant: restaurants })
    })
})

//新增餐廳
router.post('/', authenticated, (req, res) => {

  let rating = Number(req.body.rating).toFixed(1)

  const blank = Object.values(req.body).filter((value) => value === '').length
  if (blank > 0) {
    const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
    let error = `請填入所有空格!`
    return res.render('new', { error, name, name_en, category, image, location, phone, google_map, rating, description })
  }
  else if (rating < 0 || rating > 5) {
    const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
    let error = `評價請輸入1-5顆星`
    return res.render('new', { error, name, name_en, category, image, location, phone, google_map, rating, description })
  }
  else {
    let checkdone
    if (req.body.done === 'on') {
      checkdone = true
    }
    else {
      checkdone = false
    }
    // const { name, name_en, category, image, location, phone, google_map, rating, description}如果這邊要checkdone的值 解構賦值不知道怎麼做
    const restaurant = new Restaurant({
      name: req.body.name,
      name_en: req.body.name_en,
      category: req.body.category,
      image: req.body.image,
      location: req.body.location,
      phone: req.body.phone,
      google_map: req.body.google_map,
      rating: req.body.rating,
      description: req.body.description,
      done: checkdone,
      userId: req.user._id
    })

    restaurant.save(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  }

})

// 修改餐廳詳細頁面
router.get('/:id/edit', authenticated, (req, res) => {

  Restaurant.findOne({ _id: req.params.id, userId: req.user._id })
    .lean()
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      return res.render('edit', { restaurant: restaurants })
    })
})

// 修改餐廳
router.put('/:id', authenticated, (req, res) => {
  Restaurant.findOne({ _id: req.params.id, userId: req.user._id }, (err, restaurant) => {
    if (err) return console.error(err)

    restaurant.name = req.body.name
    restaurant.name_en = req.body.name_en
    restaurant.category = req.body.category
    restaurant.image = req.body.image
    restaurant.location = req.body.location
    restaurant.phone = req.body.phone
    restaurant.google_map = req.body.google_map
    restaurant.rating = req.body.rating
    restaurant.description = req.body.description
    if (req.body.done === 'on') {
      restaurant.done = true
    }
    else {
      restaurant.done = false
    }
    restaurant.save(err => {
      if (err) return console.error(err)
      return res.redirect(`/restaurants/${req.params.id}`)
    })
  })

})

//刪除
router.delete('/:id/delete', authenticated, (req, res) => {
  Restaurant.findOne({ _id: req.params.id, userId: req.user._id }, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})





module.exports = router