const express = require('express')
const router = express.Router()
const User = require('../models/user') //載入user model

// 登入頁面
router.get('/login', (req, res) => {
  res.render('login')
})

// 登入檢查
router.post('/login', (req, res) => {
  res.send('login')
})

// 註冊頁面
router.get('/register', (req, res) => {
  res.render('register')
})

// 註冊檢查
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body
  User.findOne({ email: email }).then(user => {
    if (user) {
      // email exist, can't send out
      console.log('User already exists')
      res.render('register', {                // 使用者已經註冊過
        name,
        email,
        password,
        password2
      })

    }
    else {
      // email doesn't exist, save and return to home page
      const newUser = new User({
        name,
        email,
        password
      })

      newUser
        .save()
        .then(user => {
          res.redirect('/')
        })
        .catch(err => console.log(err))
    }
  })
})

// 登出
router.get('/logout', (req, res) => {
  res.send('logout')
})

module.exports = router