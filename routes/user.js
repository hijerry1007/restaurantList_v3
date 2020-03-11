const express = require('express')
const router = express.Router()
const User = require('../models/user') //載入user model
const passport = require('passport')
const bcrypt = require('bcryptjs')
// 登入頁面
router.get('/login', (req, res) => {
  res.render('login')
})

// 登入檢查
router.post('/login', (req, res, next) => {
  const { email, password } = req.body
  let errors = [];
  if (email === '') {
    errors.push({ message: '請輸入電子郵件' })
  };

  if (password === '') {
    errors.push({ message: '請輸入密碼' })
  };

  if (errors.length > 0) {
    res.render('login', {
      errors,
      email,
      password
    })
  } else {
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/users/login',
      failureFlash: '帳號密碼輸入錯誤'
    })(req, res, next)
  }
})

// 註冊頁面
router.get('/register', (req, res) => {
  res.render('register')
})

// 註冊檢查
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body

  let errors = []

  if (!email || !password || !password2) {
    errors.push({ message: '所有欄位都是必填' })
  }
  if (password !== password2) {
    errors.push({ message: '密碼輸入錯誤' })
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    })
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        // email exist
        errors.push({ message: '這個Email已經註冊過了' })
        res.render('register', {
          errors,                // 使用者已經註冊過
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

        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err
            newUser.password = hash

            newUser
              .save()
              .then(user => {
                res.redirect('/')
              })
              .catch(err => console.log(err))
          })
        )
      }
    })
  }
})

// 登出
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出')
  res.redirect('/users/login')
})

module.exports = router