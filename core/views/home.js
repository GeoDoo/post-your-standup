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
            "Our app enables teams to collaborate more efficiently by posting their stand-ups for their Jira projects to their dedicated channels.\nEspecially when you work remotely, sometimes it is tedious to open Jira and go through all members' tickets and start explaining what you did etc.\nNow, you can post your tickets on the channel and argue about them in one place!\nMake your project manager happy, team!\n",
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
