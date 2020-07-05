const mongoose = require('mongoose')

const connect = () => {
  mongoose
    .connect(
      `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
      {
        // mongoose.connect(`mongodb://standup:lefteris@localhost:27017`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    )
    .then(() => console.log('connection succesful'))
    .catch(err => console.error(err))
}

const getConnection = () => {
  connect()
  return mongoose.connection
}

module.exports = { getConnection }
