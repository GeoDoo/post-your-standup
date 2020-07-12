const mongoose = require('mongoose')
const Schema = mongoose.Schema

const WorkspaceSchema = new Schema({
  teamId: {
    type: String,
    required: true,
    trim: true,
  },
  domain: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  token: {
    type: String,
    trim: true,
  },
  project: {
    type: String,
    trim: true,
  },
})

module.exports = mongoose.model('Workspace', WorkspaceSchema)
