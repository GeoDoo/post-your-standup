const { ACTIONS, VIEWS } = require('@root/constants')
const {
  getSectionBlock,
  getDividerBlock,
  getButtonBlock,
} = require('@core/blocks')
const { upsertWorkspace } = require('@db/models/Workspace')

module.exports = app => async ({ ack, body, view, context }) => {
  ack()

  const jiraEmail = view.state.values.jira_email.email.value.trim()
  const jiraToken = view.state.values.jira_token.token.value.trim()
  const jiraProjectDomain = view.state.values.jira_domain.projectDomain.value.trim()
  const filter = { teamId: body.team.id }
  const update = {
    teamId: body.team.id,
    domain: body.team.domain,
    email: jiraEmail,
    token: jiraToken,
    project: jiraProjectDomain,
  }

  try {
    await upsertWorkspace(filter, update)

    await app.client.views.publish({
      token: context.botToken,
      user_id: body.user.id,
      view: {
        type: 'home',
        callback_id: VIEWS.HOME_VIEW,
        blocks: [
          getSectionBlock('*Welcome to your _Post Your Standup_ app*'),
          getSectionBlock(
            "Our app enables teams to collaborate more efficiently by posting their stand-ups for their Jira projects to their dedicated channels.\nEspecially when you work remotely, sometimes it is tedious to open Jira and go through all members' tickets and start explaining what you did etc.\nNow, you can post your tickets on the channel and argue about them in one place!\nMake your project manager happy, team!\n",
          ),
          getSectionBlock('\n'),
          getDividerBlock(),
          getSectionBlock(':gear: *Settings*\n'),
          getSectionBlock(
            'Basic authentication has already been successfully set up :tada:\n',
          ),
          getSectionBlock('\n'),
          getSectionBlock(
            'If you wish to change Jira account though, you can set a new one by clicking below:\n',
          ),
          {
            type: 'actions',
            elements: [
              getButtonBlock(
                'Change Jira account',
                'change_jira_account',
                ACTIONS.OPEN_SETUP_JIRA_MODAL,
              ),
            ],
          },
        ],
      },
    })
  } catch (error) {
    console.log(error)
  }
}
