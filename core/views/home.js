const { ACTIONS, VIEWS, TEXT } = require('@root/constants')
const {
  getSectionBlock,
  getDividerBlock,
  getButtonBlock,
} = require('@core/blocks')
const { findByTeamId } = require('@db/models/Workspace')
const { storeError } = require('@db/models/Logger')

module.exports = app => async ({ event, context }) => {
  try {
    const jiraUser =
      event && event.view ? await findByTeamId(event.view.team_id) : null
    const nonAuthenticatedBlocks = [
      getSectionBlock(TEXT.HOME.TITLE),
      getSectionBlock(TEXT.HOME.INTRO),
      getSectionBlock('\n'),
      getDividerBlock(),
      getSectionBlock(TEXT.HOME.SETTINGS.TITLE),
      {
        type: 'actions',
        elements: [
          getButtonBlock(
            TEXT.BUTTONS.CONNECT_TO_JIRA,
            'authenticate_me',
            ACTIONS.OPEN_SETUP_JIRA_MODAL,
          ),
        ],
      },
    ]
    const authenticatedBlocks = [
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
    ]

    if (jiraUser) {
      await app.client.views.publish({
        token: context.botToken,
        user_id: event.user,
        view: {
          type: 'home',
          callback_id: VIEWS.HOME_VIEW,
          blocks: authenticatedBlocks,
        },
      })
    } else {
      await app.client.views.publish({
        token: context.botToken,
        user_id: event.user,
        view: {
          type: 'home',
          callback_id: VIEWS.HOME_VIEW,
          blocks: nonAuthenticatedBlocks,
        },
      })
    }
  } catch (e) {
    console.error(e)
    await storeError(e)
  }
}
