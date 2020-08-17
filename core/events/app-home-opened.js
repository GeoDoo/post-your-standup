const { ACTIONS } = require('@root/constants')
const {
  getSectionBlock,
  getDividerBlock,
  getButtonBlock,
} = require('@core/blocks')

module.exports = app => async ({ event, context }) => {
  try {
    await app.client.views.publish({
      token: context.botToken,
      user_id: event.user,
      view: {
        type: 'home',
        callback_id: 'home_view',
        blocks: [
          getSectionBlock('*Welcome to your _Post Your Standup_ app*'),
          getSectionBlock(
            'Our app enables teams to collaborate more efficiently by posting their standups for a Jira project to their dedicated channels.\nMake your project manager happy, team! :tada::tada::tada:\n',
          ),
          getSectionBlock('\n'),
          getDividerBlock(),
          getSectionBlock(':gear: *Settings*\n'),
          getSectionBlock(
            'Setup basic authentication for your Jira projects\n',
          ),
          {
            type: 'actions',
            elements: [
              getButtonBlock(
                'Authenticate me',
                'authenticate_me',
                ACTIONS.OPEN_SETUP_JIRA_MODAL,
              ),
            ],
          },
        ],
      },
    })
  } catch (error) {
    console.error(error.data.response_metadata)
  }
}
