const mongoose = require('mongoose')

const Schema = mongoose.Schema

const WorkspaceSchema = new Schema({
  teamId: {
    type: String,
    required: true,
    trim: true,
  },
})

WorkspaceSchema.pre('save', true, function(next, done) {
  const self = this
  mongoose.models['Workspace'].findOne({ teamId: self.teamId }, function (
    err,
    user,
  ) {
    if (err) {
      done(err)
    } else if (user) {
      self.invalidate('teamId', 'teamId must be unique')
      done(new Error('teamId must be unique'))
    } else {
      done()
    }
  })
  next()
})

module.exports = mongoose.model('Workspace', WorkspaceSchema)
