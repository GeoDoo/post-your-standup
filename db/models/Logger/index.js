const moment = require('moment')
const { serializeError } = require('serialize-error')
const ErrorModel = require('./Schema')

const fetchErrors = async () => {
  try {
    return await ErrorModel.find({})
  } catch (e) {
    console.error(e)
    throw e
  }
}

const storeError = async error => {
  await ErrorModel.findOneAndUpdate(
    { timestamp: moment().valueOf() },
    { error: serializeError(error) },
    {
      new: true,
      upsert: true,
    },
  )
}

module.exports = { storeError, fetchErrors }
