const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')


//列出所有餐廳清單
router.get('/', (req, res) => {
  Restaurant.find()
    .sort({ name: 'asc' })
    .lean()
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      return res.render('index', { restaurant: restaurants })
    })
})

//新增餐廳頁面
router.get('/new', (req, res) => {
  res.render('new')
})

//顯示詳細資料
router.get('/:id', (req, res) => {
  Restaurant.findById(req.params.id)
    .lean()
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      return res.render('show', { restaurant: restaurants })
    })
})

//新增餐廳
router.post('/', (req, res) => {

  if (req.body.name === '' || req.body.name_en === '' || req.body.category === '' || req.body.image === '' || req.body.location === '' || req.body.phone === '' || req.body.google_map === '' || req.body.rating === '' || req.body.description === '') {
    let error = `所有格子都要輸入喔!`
    return res.render('new', { error: error })

  }
  else {
    let checkdone
    if (req.body.done === 'on') {
      checkdone = true
    }
    else {
      checkdone = false
    }
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
    })

    restaurant.save(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  }

})

// 修改餐廳詳細頁面
router.get('/:id/edit', (req, res) => {

  Restaurant.findById(req.params.id)
    .lean()
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      return res.render('edit', { restaurant: restaurants })
    })
})

// 修改餐廳
router.put('/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
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
router.delete('/:id/delete', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})





module.exports = router