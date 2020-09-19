const { ACTIONS, VIEWS, TEXT } = require('@root/constants')
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
          getSectionBlock(TEXT.HOME.TITLE),
          getSectionBlock(TEXT.HOME.INTRO),
          getSectionBlock('\n'),
          getDividerBlock(),
          getSectionBlock(TEXT.HOME.SETTINGS.TITLE),
          getSectionBlock(TEXT.HOME.SETTINGS.INTRO_AUTHENTICATED),
          getSectionBlock('\n'),
          getSectionBlock(TEXT.HOME.SETTINGS.CHANGE_ACCOUNT),
          {
            type: 'actions',
            elements: [
              getButtonBlock(
                TEXT.BUTTONS.CHANGE_ACCOUNT,
                'change_jira_account',
                ACTIONS.OPEN_SETUP_JIRA_MODAL,
              ),
            ],
          },
        ],
      },
    })
  } catch (e) {
    console.error(e)
  }
}
