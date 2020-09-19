const mongoose = require('mongoose')
const { TEXT } = require('@root/constants')

mongoose.set('useFindAndModify', false)

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
    .then(() => console.log(TEXT.DB.MESSAGES.CONNECTION_SUCCESSFUL))
    .catch(err => console.error(err))
}

const getConnection = () => {
  connect()
  return mongoose.connection
}

module.exports = { getConnection }
