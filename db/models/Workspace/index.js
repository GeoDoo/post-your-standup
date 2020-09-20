const WorkspaceModel = require('./Schema')
const { encrypt, decrypt } = require('@utils/cipher')

const findByTeamId = async teamId => {
  return WorkspaceModel.findOne({ teamId })
    .then(workspace => {
      if (workspace) {
        return {
          email: workspace.email,
          token: decrypt(workspace.token),
          project: workspace.project,
        }
      }
      return null
    })
    .catch(e => {
      return e
    })
}

const upsertWorkspace = async (filter, update) => {
  update.token = encrypt(update.token)
  await WorkspaceModel.findOneAndUpdate(filter, update, {
    new: true,
    upsert: true,
  })
}

const findAll = async () => {
  return await WorkspaceModel.find({}, function (err, workspaces) {
    if (err) throw err

    return workspaces
  })
}

module.exports = { findByTeamId, upsertWorkspace, findAll }
