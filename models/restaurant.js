// set mongoose
const mongoose = require('mongoose')

// db schema
const Schema = mongoose.Schema

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  name_en: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  google_map: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  done: {                             // 「完成狀態」
    type: Boolean,
    default: false               // 預設完成狀態為 false
  }
})

module.exports = mongoose.model('Restaurant', restaurantSchema)