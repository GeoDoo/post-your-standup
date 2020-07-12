const WorkspaceModel = require('./Schema')

const findByTeamId = async teamId => {
  let jiraUser
  await WorkspaceModel.findOne({ teamId }, function (err, workspace) {
    jiraUser = {
      email: workspace.email,
      token: workspace.token,
      project: workspace.project,
    }
  })
  return jiraUser
}

const upsertWorkspace = async (filter, update) => {
  await WorkspaceModel.findOneAndUpdate(filter, update, {
    new: true,
    upsert: true,
  })
}

module.exports = { findByTeamId, upsertWorkspace }
