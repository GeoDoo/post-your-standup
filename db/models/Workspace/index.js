const WorkspaceModel = require('./Schema')

const findByTeamId = async teamId => {
  return await WorkspaceModel.findOne({ teamId }, function (err, workspace) {
    if (err) throw err

    if (workspace) {
      return {
        email: workspace.email,
        token: workspace.token,
        project: workspace.project,
      }
    }

    return null
  })
}

const upsertWorkspace = async (filter, update) => {
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
