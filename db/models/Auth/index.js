const AuthModel = require('./Schema')

const fetchInstallation = async teamId => {
  try {
    const auth = await AuthModel.findOne({ teamId })

    if (auth) {
      return auth.installation
    }

    return null
  } catch (e) {
    console.error(e)
    throw e
  }
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
