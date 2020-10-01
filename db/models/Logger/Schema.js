const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LoggerSchema = new Schema({
  timestamp: {
    type: Number,
    required: true,
  },
  error: {
    type: Object,
    required: true,
  },
})

module.exports = mongoose.model('Logger', LoggerSchema)
