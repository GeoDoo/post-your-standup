const mongoose = require('mongoose')

const connect = () => {
  mongoose.Promise = global.Promise

  mongoose
    .connect('mongodb://localhost:27017/standup', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      user: 'standup',
      pass: 'lefteris',
    })
    .then(() => console.log('connection succesful'))
    .catch(err => console.error(err))
}

const getConnection = () => {
  connect()
  return mongoose.connection
}

module.exports = { getConnection }
