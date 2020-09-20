const AuthModel = require('./Schema')

const fetchInstallation = async teamId => {
  return AuthModel.findOne({ teamId })
    .then(auth => {
      if (auth) {
        return auth.installation
      }
      return null
    })
    .catch(e => {
      return e
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
