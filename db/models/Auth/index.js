const AuthModel = require('./Schema')

const fetchInstallation = async teamId => {
  return await AuthModel.findOne({ teamId }, function (err, auth) {
    if (err) throw err

    if (auth) {
      return auth.installation
    }

    return null
  })
}

const storeInstallation = async (teamId, installation) => {
  await AuthModel.findOneAndUpdate(
    { teamId },
    { installation },
    {
      new: true,
      upsert: true,
    },
  )
}

module.exports = { fetchInstallation, storeInstallation }
