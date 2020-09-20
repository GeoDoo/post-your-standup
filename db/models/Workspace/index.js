const WorkspaceModel = require('./Schema')
const { encrypt, decrypt } = require('@utils/cipher')

const findByTeamId = async teamId => {
  try {
    const workspace = await WorkspaceModel.findOne({ teamId })

    if (workspace) {
      return {
        email: workspace.email,
        token: decrypt(workspace.token),
        project: workspace.project,
      }
    }

    return null
  } catch (e) {
    console.error(e)
    throw e
  }
}

const upsertWorkspace = async (filter, update) => {
  update.token = encrypt(update.token)
  await WorkspaceModel.findOneAndUpdate(filter, update, {
    new: true,
    upsert: true,
  })
}

const findAll = async () => {
  try {
    return await WorkspaceModel.find({})
  } catch (e) {
    console.error(e)
    throw e
  }
}

module.exports = { findByTeamId, upsertWorkspace, findAll }
