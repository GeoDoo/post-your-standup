const mongoose = require('mongoose')
// `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,

const connect = () => {
  mongoose.Promise = global.Promise

  mongoose
    .connect('mongodb://localhost:27017/standup', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      user: 'lala',
      pass: 'lalakis',
    })
    .then(() => console.log('connection succesful'))
    .catch(err => console.error(err))
}

const getConnection = () => {
  connect()
  return mongoose.connection
}

module.exports = { getConnection }
