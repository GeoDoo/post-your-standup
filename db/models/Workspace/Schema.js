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

WorkspaceSchema.pre('save', true, function (next, done) {
  mongoose.models['Workspace'].findOne({ teamId: this.teamId }, (err, user) => {
    if (err) {
      done(err)
    } else if (user) {
      this.invalidate('teamId', 'teamId must be unique')
      done()
    } else {
      done()
    }
  })
  next()
})

module.exports = mongoose.model('Workspace', WorkspaceSchema)
