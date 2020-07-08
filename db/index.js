const mongoose = require('mongoose')

const connect = () => {
  mongoose.Promise = global.Promise

  mongoose
    .connect(
      `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        user: process.env.DB_USERNAME,
        pass: process.env.DB_PASSWORD,
      },
    )
    .then(() => console.log('connection successful'))
    .catch(err => console.error(err))
}

const getConnection = () => {
  connect()
  return mongoose.connection
}

module.exports = { getConnection }
