const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AuthSchema = new Schema({
  teamId: {
    type: String,
    required: true,
    trim: true,
  },
  installation: {
    type: Object,
    required: true,
  },
})

module.exports = mongoose.model('Auth', AuthSchema)
